const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = 'fe1ff0c3-f85d-4970-93df-cd710cb36853';

const companyConfig = {
  name: "Cinderbelle Cleaning",
  logoUrl: "",
  headerTitle: "Request a Free Quote",
  theme: {
    primaryColor: "#7a1fa2",
    headerTextColor: "#7a1fa2",
    headerFontSize: "22px",
    headerFontWeight: "800"
  },
  serviceArea: {
    enabled: true,
    prefixToCity: {
      // Burlington
      "L7L": "Burlington",
      "L7M": "Burlington",
      "L7N": "Burlington",
      "L7P": "Burlington",
      "L7R": "Burlington",
      "L7S": "Burlington",
      "L7T": "Burlington",
      // Oakville
      "L6H": "Oakville",
      "L6J": "Oakville",
      "L6K": "Oakville",
      "L6L": "Oakville",
      "L6M": "Oakville",
      // Milton
      "L9E": "Milton",
      "L9T": "Milton",
      // Waterdown
      "L0R": "Waterdown",
      "L8B": "Waterdown",
      // Stoney Creek
      "L8E": "Stoney Creek",
      "L8G": "Stoney Creek",
      // Hamilton
      "L8H": "Hamilton",
      "L8J": "Hamilton",
      "L8K": "Hamilton",
      "L8L": "Hamilton",
      "L8M": "Hamilton",
      "L8N": "Hamilton",
      "L8P": "Hamilton",
      "L8R": "Hamilton",
      "L8S": "Hamilton",
      "L8T": "Hamilton",
      "L8V": "Hamilton",
      "L8W": "Hamilton",
      "L9A": "Hamilton",
      "L9B": "Hamilton",
      "L9C": "Hamilton",
      // Ancaster
      "L9G": "Ancaster",
      "L9K": "Ancaster",
      // Dundas
      "L9H": "Dundas"
    },
    errorMessage: "We do not currently service your area yet. Please contact us directly for special accommodations."
  }
};

// Helper: Email Validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}

// Helper: Phone Number Formatting (XXX) XXX-XXXX
function formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

// Helper: Canadian Postal Code Formatting (A1A 1A1) & Validation
function formatPostalCode(value) {
  if (!value) return "";
  const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length > 3) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)}`;
  }
  return clean;
}

function isValidCanadianPostal(postal) {
  const clean = postal.toUpperCase().replace(/\s+/g, "");
  return /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/.test(clean);
}

// Containers & Interactive Elements
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const resultDiv = document.getElementById("result");
const widgetSubtitle = document.getElementById("widget-subtitle");

const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const submitBtn = document.getElementById("submit-btn");

const clientNameInput = document.getElementById("client-name");
const clientEmailInput = document.getElementById("client-email");
const clientPhoneInput = document.getElementById("client-phone");
const postalInput = document.getElementById("lead-postal");
const clientReferralInput = document.getElementById("client-referral");
const postalError = document.getElementById("postal-error");
const errorMsg = document.getElementById("error-msg");

// Form Inputs
const sqftSlider = document.getElementById("sqft-slider");
const sqftDisplay = document.getElementById("sqft-display");
const serviceTypeSelect = document.getElementById("service-type");
const frequencyGroup = document.getElementById("frequency-group");
const frequencySelect = document.getElementById("frequency");
const bedroomsSelect = document.getElementById("bedrooms-select");
const bathroomsSelect = document.getElementById("bathrooms-select");
const petsCheck = document.getElementById("condition-pets");
const kidsCheck = document.getElementById("condition-kids");
const basementCheck = document.getElementById("condition-basement");

// Add-on Inputs
const addonFridge = document.getElementById("addon-fridge");
const addonOven = document.getElementById("addon-oven");
const winCountDisplay = document.getElementById("window-count-display");
const btnWinMinus = document.getElementById("btn-win-minus");
const btnWinPlus = document.getElementById("btn-win-plus");
let windowCount = 0;

// Result Summary Elements
const resultCustomThankYou = document.getElementById("result-custom-thankyou");
const summaryService = document.getElementById("summary-service");
const summaryRooms = document.getElementById("summary-rooms");
const summaryFrequency = document.getElementById("summary-frequency");
const summaryAddons = document.getElementById("summary-addons");

// Format Phone Input
if (clientPhoneInput) {
  clientPhoneInput.addEventListener("input", (e) => {
    e.target.value = formatPhoneNumber(e.target.value);
  });
}

// Format Postal Input
if (postalInput) {
  postalInput.addEventListener("input", (e) => {
    e.target.value = formatPostalCode(e.target.value);
  });
}

// Window Counter Steppers
if (btnWinPlus && btnWinMinus && winCountDisplay) {
  btnWinPlus.onclick = () => {
    windowCount++;
    winCountDisplay.textContent = windowCount;
  };
  btnWinMinus.onclick = () => {
    if (windowCount > 0) {
      windowCount--;
      winCountDisplay.textContent = windowCount;
    }
  };
}

// Slider Display Updates
function updateSqftDisplay() {
  if (!sqftSlider || !sqftDisplay) return;
  const val = Number(sqftSlider.value);
  if (val > 4000) {
    sqftDisplay.textContent = "4,000+ sq ft";
  } else {
    sqftDisplay.textContent = `${val.toLocaleString()} sq ft`;
  }
}
if (sqftSlider) {
  sqftSlider.addEventListener("input", updateSqftDisplay);
  sqftSlider.addEventListener("change", updateSqftDisplay);
  updateSqftDisplay();
}

// Toggle Frequency selector based on Service Type
function handleServiceTypeChange() {
  if (!serviceTypeSelect || !frequencyGroup) return;
  const sType = serviceTypeSelect.value;
  if (sType === "deep" || sType === "move") {
    frequencyGroup.style.display = "none";
  } else {
    frequencyGroup.style.display = "block";
  }
  notifyParentOfResize();
}
if (serviceTypeSelect) {
  serviceTypeSelect.addEventListener("change", handleServiceTypeChange);
}

// Theme Application
function applyTheme() {
  const brandColor = companyConfig.theme?.primaryColor || "#7a1fa2";
  const companyLogo = document.getElementById("company-logo");
  const widgetTitle = document.getElementById("widget-title");

  if (companyConfig.logoUrl && companyConfig.logoUrl.trim() !== "") {
    if (companyLogo) {
      companyLogo.src = companyConfig.logoUrl;
      companyLogo.style.display = "block";
    }
    if (widgetTitle) widgetTitle.style.display = "none";
  } else if (widgetTitle) {
    if (companyLogo) companyLogo.style.display = "none";
    widgetTitle.style.display = "block";
    widgetTitle.textContent = companyConfig.headerTitle;
    widgetTitle.style.color = companyConfig.theme?.headerTextColor || brandColor;
    widgetTitle.style.fontSize = companyConfig.theme?.headerFontSize || "26px";
    widgetTitle.style.fontWeight = companyConfig.theme?.headerFontWeight || "800";
  }

  if (nextBtn) nextBtn.style.backgroundColor = brandColor;
  if (submitBtn) submitBtn.style.backgroundColor = brandColor;
}
applyTheme();

// Step Navigation
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    step1.style.display = "none";
    step2.style.display = "block";
    notifyParentOfResize();
  });
}

if (backBtn) {
  backBtn.addEventListener("click", () => {
    step2.style.display = "none";
    step1.style.display = "block";
    if (errorMsg) errorMsg.style.display = "none";
    if (postalError) postalError.style.display = "none";
    notifyParentOfResize();
  });
}

// Submission Handler (Strict Validation + Auto City Detection)
if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const name = clientNameInput?.value.trim() || "";
    const email = clientEmailInput?.value.trim() || "";
    const phone = clientPhoneInput?.value.trim() || "";
    const rawPostal = postalInput ? postalInput.value.trim().toUpperCase().replace(/\s+/g, "") : "";
    const formattedPostal = formatPostalCode(rawPostal);
    const referral = clientReferralInput?.value.trim() || "";

    if (errorMsg) {
      errorMsg.style.display = "none";
      errorMsg.textContent = "";
    }
    if (postalError) {
      postalError.style.display = "none";
      postalError.textContent = "";
    }

    // 1. Required Fields & Format Validation
    if (!name) {
      errorMsg.textContent = "Please enter your full name.";
      errorMsg.style.display = "block";
      clientNameInput?.focus();
      notifyParentOfResize();
      return;
    }

    if (!email || !isValidEmail(email)) {
      errorMsg.textContent = "Please enter a valid email address.";
      errorMsg.style.display = "block";
      clientEmailInput?.focus();
      notifyParentOfResize();
      return;
    }

    const digitsOnly = phone.replace(/[^\d]/g, "");
    if (digitsOnly.length < 10) {
      errorMsg.textContent = "Please enter a complete 10-digit phone number.";
      errorMsg.style.display = "block";
      clientPhoneInput?.focus();
      notifyParentOfResize();
      return;
    }

    if (!rawPostal || !isValidCanadianPostal(rawPostal)) {
      if (postalError) {
        postalError.textContent = "Please enter a complete 6-character postal code (e.g., L7L 1A1).";
        postalError.style.display = "block";
      }
      postalInput?.focus();
      notifyParentOfResize();
      return;
    }

    // 2. Service Area Territory Validation & Automatic City Detection
    let detectedCity = "Unknown";
    const territoryConfig = companyConfig.serviceArea;
    if (territoryConfig && territoryConfig.enabled) {
      const fsaPrefix = rawPostal.slice(0, 3);
      const matchedCity = territoryConfig.prefixToCity[fsaPrefix];

      if (!matchedCity) {
        if (postalError) {
          postalError.textContent = territoryConfig.errorMessage;
          postalError.style.display = "block";
        }
        postalInput?.focus();
        notifyParentOfResize();
        return;
      }
      detectedCity = matchedCity;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending your request...";

    // 3. Gather Service & Household Details for Web3Forms Email
    const rawSqft = Number(sqftSlider?.value) || 1500;
    const sqftLabel = rawSqft > 4000 ? "4,000+ sq ft" : `${rawSqft.toLocaleString()} sq ft`;
    const selectedServiceType = serviceTypeSelect ? serviceTypeSelect.value : "standard";
    const serviceLabel = serviceTypeSelect ? serviceTypeSelect.options[serviceTypeSelect.selectedIndex]?.text : "Standard Clean";
    const freqLabel = (selectedServiceType === "deep" || selectedServiceType === "move")
      ? "One-Time Clean"
      : (frequencySelect ? frequencySelect.options[frequencySelect.selectedIndex]?.text : "Bi-Weekly");

    const bedsText = bedroomsSelect ? bedroomsSelect.options[bedroomsSelect.selectedIndex]?.text : "N/A";
    const bathsText = bathroomsSelect ? bathroomsSelect.options[bathroomsSelect.selectedIndex]?.text : "N/A";
    const petsVal = petsCheck && petsCheck.checked ? "Yes" : "No";
    const kidsVal = kidsCheck && kidsCheck.checked ? "Yes" : "No";
    const basementVal = basementCheck && basementCheck.checked ? "Yes" : "No";

    const selectedAddonsList = [];
    if (addonFridge && addonFridge.checked) selectedAddonsList.push("Inside Fridge");
    if (addonOven && addonOven.checked) selectedAddonsList.push("Inside Oven");
    if (windowCount > 0) selectedAddonsList.push(`Interior Windows (x${windowCount})`);

    const addonsSummaryText = selectedAddonsList.length > 0 ? selectedAddonsList.join(", ") : "None";
    const referralSummary = referral ? `${referral} (Eligible for 10% First Clean Discount)` : "None";

    const leadData = {
      _subject: `New Quote Request: ${name} — ${detectedCity} (${serviceLabel})`,
      _replyto: email,
      "Customer Name": name,
      "Email Address": email,
      "Phone Number": phone,
      "City": detectedCity,
      "Postal Code": formattedPostal,
      "Referred By": referralSummary,
      "Service Requested": serviceLabel,
      "Cleaning Frequency": freqLabel,
      "Home Size": `${sqftLabel} (${bedsText}, ${bathsText})`,
      "Basement Included in Sq Ft": basementVal,
      "Pets in Home": petsVal,
      "Children in Home": kidsVal,
      "Selected Add-ons": addonsSummaryText,
      "Submitted At": new Date().toLocaleString()
    };

    // 4. Send Lead to Web3Forms
    fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...leadData })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Submission failed");
        return res.json();
      })
      .then(() => {
        // Hide Step 2 & Header Subtitle, Reveal Step 3 Thank You
        step2.style.display = "none";
        if (widgetSubtitle) widgetSubtitle.style.display = "none";
        resultDiv.style.display = "block";

        if (resultCustomThankYou) {
          resultCustomThankYou.innerHTML = `Thanks, <strong>${name}</strong>! We've received your cleaning details for <strong>${detectedCity}</strong> and someone from our team will contact you shortly.`;
        }
        if (summaryService) summaryService.textContent = serviceLabel;
        if (summaryRooms) summaryRooms.textContent = `${sqftLabel} (${bedsText}, ${bathsText})`;
        if (summaryFrequency) summaryFrequency.textContent = freqLabel;
        if (summaryAddons) summaryAddons.textContent = addonsSummaryText;

        notifyParentOfResize();
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        if (errorMsg) {
          errorMsg.textContent = "There was an error sending your request. Please try again or call us at 905-407-7098.";
          errorMsg.style.display = "block";
        }
        submitBtn.disabled = false;
        submitBtn.textContent = "Request My Free Quote";
        notifyParentOfResize();
      });
  });
}

function notifyParentOfResize() {
  if (window.parent && window.parent !== window) {
    const currentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    window.parent.postMessage({ type: "RESIZE_CALCULATOR_IFRAME", height: currentHeight }, "*");
  }
}

window.addEventListener("load", notifyParentOfResize);
window.addEventListener("resize", notifyParentOfResize);