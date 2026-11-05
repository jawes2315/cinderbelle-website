const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = 'fe1ff0c3-f85d-4970-93df-cd710cb36853'; // <-- Paste your actual key inside quotes

const companyConfig = {
  name: "Cinderbelle Cleaning",
  logoUrl: "",
  headerTitle: "",
  ctaAction: {
    enabled: false,
    text: "Schedule Your Cleaning Now →",
    url: "tel:19054077098"
  },
  theme: {
    primaryColor: "#7a1fa2",
    headerTextColor: "#e11d48",
    headerFontSize: "28px",
    headerFontWeight: "800"
  },
  minimumVisitPrice: 100, // $100 minimum visit floor (pre-tax)

  // Maintenance Sq Ft Rates
  ratesPerSqft: {
    weekly: 0.10,
    biweekly: 0.12,
    monthly: 0.15,
    "one-time": 0.15
  },
  firstVisitSurcharge: 50, // Flat $50 extra on the first visit
  // Specialized Clean Rates
  deepCleanRate: 0.20,
  moveInOutRate: 0.30,

  // Add-on Rates
  addons: {
    fridge: 30,
    oven: 35,
    windowRate: 5
  },

  serviceArea: {
    enabled: true,
    allowedPrefixes: [
      "L7L", "L7M", "L7N", "L7P", "L7R", "L7T", "L7S",
      "L6H", "L6J", "L6K", "L6L", "L6M",
      "L8E", "L8G", "L8H", "L8K", "L8L", "L8M", "L8N", "L8P", "L8R", "L8S", "L8T", "L8V", "L8W",
      "L9A", "L9B", "L9C", "L9G", "L9H", "L9K"
    ],
    errorMessage: "We do not currently service your area yet. Please contact us directly for special accommodations."
  },

  tax: {
    enabled: true,
    rate: 0.13,
    label: "HST (13%)"
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

// Containers & Interactive Elements
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const resultDiv = document.getElementById("result");

const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const submitBtn = document.getElementById("submit-btn");

const clientNameInput = document.getElementById("client-name");
const clientEmailInput = document.getElementById("client-email");
const clientPhoneInput = document.getElementById("client-phone");
const postalInput = document.getElementById("lead-postal");
const postalError = document.getElementById("postal-error");
const errorMsg = document.getElementById("error-msg");

// Form Inputs
const sqftSlider = document.getElementById("sqft-slider");
const sqftDisplay = document.getElementById("sqft-display");
const frequencySelect = document.getElementById("frequency");
const bedroomsSelect = document.getElementById("bedrooms-select");
const bathroomsSelect = document.getElementById("bathrooms-select");
const petsCheck = document.getElementById("condition-pets");
const kidsCheck = document.getElementById("condition-kids");

// Add-on Inputs
const addonFridge = document.getElementById("addon-fridge");
const addonOven = document.getElementById("addon-oven");
const winCountDisplay = document.getElementById("window-count-display");
const btnWinMinus = document.getElementById("btn-win-minus");
const btnWinPlus = document.getElementById("btn-win-plus");
let windowCount = 0;

// Result Breakdown Elements
const resultCustomThankYou = document.getElementById("result-custom-thankyou");
const summaryRooms = document.getElementById("summary-rooms");
const summaryFrequency = document.getElementById("summary-frequency");
const summaryAddons = document.getElementById("summary-addons");
const summaryTotal = document.getElementById("summary-total");

// Format Phone Input
if (clientPhoneInput) {
  clientPhoneInput.addEventListener("input", (e) => {
    e.target.value = formatPhoneNumber(e.target.value);
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
    sqftDisplay.textContent = "4,000+ sq ft (Walkthrough Required)";
  } else {
    sqftDisplay.textContent = `${val.toLocaleString()} sq ft`;
  }
}
if (sqftSlider) {
  sqftSlider.addEventListener("input", updateSqftDisplay);
  sqftSlider.addEventListener("change", updateSqftDisplay);
  updateSqftDisplay();
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
    widgetTitle.style.fontSize = companyConfig.theme?.headerFontSize || "24px";
    widgetTitle.style.fontWeight = companyConfig.theme?.headerFontWeight || "700";
  }

  if (nextBtn) nextBtn.style.backgroundColor = brandColor;
  if (submitBtn) submitBtn.style.backgroundColor = brandColor;

  const ctaContainer = document.getElementById("summary-cta-container");
  const ctaBtn = document.getElementById("summary-cta-btn");
  if (ctaContainer && ctaBtn) {
    if (companyConfig.ctaAction && companyConfig.ctaAction.enabled) {
      if (ctaContainer) ctaContainer.style.display = "block";
      ctaBtn.textContent = companyConfig.ctaAction.text;
      ctaBtn.href = companyConfig.ctaAction.url || "#";
      ctaBtn.style.backgroundColor = brandColor;
    } else {
      if (ctaContainer) ctaContainer.style.display = "none";
    }
    }
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
    notifyParentOfResize();
  });
}

// Submission & Pricing Engine
if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const name = clientNameInput?.value.trim() || "";
    const email = clientEmailInput?.value.trim() || "";
    const phone = clientPhoneInput?.value.trim() || "";

    if (errorMsg) {
      errorMsg.style.display = "none";
      errorMsg.textContent = "";
    }

    // 1. Validation
    if (!name || !email) {
      errorMsg.textContent = "Please enter your name and email before seeing the estimate.";
      errorMsg.style.display = "block";
      return;
    }

    if (!isValidEmail(email)) {
      errorMsg.textContent = "Please enter a valid email address.";
      errorMsg.style.display = "block";
      return;
    }

    const digitsOnly = phone.replace(/[^\d]/g, "");
    if (digitsOnly.length > 0 && digitsOnly.length < 10) {
      errorMsg.textContent = "Please enter a valid 10-digit phone number.";
      errorMsg.style.display = "block";
      return;
    }

    // Service Area Postal Validation
    const territoryConfig = companyConfig.serviceArea;
    if (territoryConfig && territoryConfig.enabled) {
      const rawPostal = postalInput ? postalInput.value.trim().toUpperCase().replace(/\s+/g, "") : "";
      if (!rawPostal) {
        if (postalError) {
          postalError.textContent = "Please enter your postal code.";
          postalError.style.display = "block";
        }
        return;
      }

      const isCovered = territoryConfig.allowedPrefixes.some(prefix => rawPostal.startsWith(prefix.trim().toUpperCase()));
      if (!isCovered) {
        if (postalError) {
          postalError.textContent = territoryConfig.errorMessage;
          postalError.style.display = "block";
        }
        return;
      } else if (postalError) {
        postalError.style.display = "none";
      }
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Calculating your estimate...";

// 2. Pricing Calculations
const rawSqft = Number(sqftSlider?.value) || 1500;
const isWalkthrough = rawSqft >= 4100;
const sqft = isWalkthrough ? 4000 : rawSqft;
const freqKey = frequencySelect ? frequencySelect.value : "biweekly";
const isRecurring = freqKey !== "one-time";
    // Add-on Totals
    let addonsTotal = 0;
    const selectedAddonsList = [];
    if (addonFridge && addonFridge.checked) {
      addonsTotal += companyConfig.addons.fridge;
      selectedAddonsList.push("Inside Fridge ($30)");
    }
    if (addonOven && addonOven.checked) {
      addonsTotal += companyConfig.addons.oven;
      selectedAddonsList.push("Inside Oven ($35)");
    }
    if (windowCount > 0) {
      const windowCost = windowCount * companyConfig.addons.windowRate;
      addonsTotal += windowCost;
      selectedAddonsList.push(`Interior Windows x${windowCount} ($${windowCost})`);
    }

    const minimumFloor = companyConfig.minimumVisitPrice || 100;
    const taxRate = companyConfig.tax?.rate || 0.13;
    let minFeeApplied = false;

    // Calculation A: Ongoing / Standard Maintenance Clean
    const maintenanceRate = companyConfig.ratesPerSqft[freqKey] || 0.12;
    let ongoingBase = sqft * maintenanceRate;
    let recurringSub = Math.max(ongoingBase, minimumFloor);
    if (ongoingBase < minimumFloor) minFeeApplied = true;

    let recurringTax = Math.round(recurringSub * taxRate * 100) / 100;
    let recurringTotal = Math.round((recurringSub + recurringTax) * 100) / 100;

// Calculation B: First Visit ($50 above ongoing rate + Add-ons)
let firstVisitBase = ongoingBase + companyConfig.firstVisitSurcharge + addonsTotal;
let firstVisitSub = Math.max(firstVisitBase, minimumFloor);
if (firstVisitBase < minimumFloor) minFeeApplied = true;

let firstVisitTax = Math.round(firstVisitSub * taxRate * 100) / 100;
let firstVisitTotal = Math.round((firstVisitSub + firstVisitTax) * 100) / 100;

    // Calculation C: One-Time Clean ($0.15/sq ft + Add-ons)
    let oneTimeBase = (sqft * companyConfig.ratesPerSqft["one-time"]) + addonsTotal;
    let standardSubtotal = Math.max(oneTimeBase, minimumFloor);
    if (oneTimeBase < minimumFloor) minFeeApplied = true;

    let standardTax = Math.round(standardSubtotal * taxRate * 100) / 100;
    let standardTotal = Math.round((standardSubtotal + standardTax) * 100) / 100;

    // 3. Operational Household Context for Email
    const bedsText = bedroomsSelect ? bedroomsSelect.options[bedroomsSelect.selectedIndex]?.text : "N/A";
    const bathsText = bathroomsSelect ? bathroomsSelect.options[bathroomsSelect.selectedIndex]?.text : "N/A";
    const petsVal = petsCheck && petsCheck.checked ? "Yes" : "No";
    const kidsVal = kidsCheck && kidsCheck.checked ? "Yes" : "No";
    const freqLabel = frequencySelect ? frequencySelect.options[frequencySelect.selectedIndex]?.text : "Bi-Weekly";

    const leadData = {
      _subject: isRecurring
        ? `New Lead: ${name} (1st: $${firstVisitTotal.toFixed(2)} | Ongoing: $${recurringTotal.toFixed(2)})`
        : `New One-Time Lead: ${name} ($${standardTotal.toFixed(2)})`,
      _replyto: email,

      "Customer Name": name,
      "Email Address": email,
      "Phone Number": phone || "Not provided",
      "Postal Code": postalInput ? postalInput.value.trim().toUpperCase() : "N/A",
      "Home Size": `${sqft.toLocaleString()} sq ft (${bedsText}, ${bathsText})`,
      "Service Frequency": freqLabel,
      "Pets in Home": petsVal,
      "Kids in Home": kidsVal,
      "Selected Add-ons": selectedAddonsList.length > 0 ? selectedAddonsList.join(", ") : "None",

      ...(isRecurring
        ? {
            "1st Visit CleanSubtotal": `$${firstVisitSub.toFixed(2)}`,
            "1st Visit HST (13%)": `$${firstVisitTax.toFixed(2)}`,
            "1st Visit Total": `$${firstVisitTotal.toFixed(2)}`,
            "Ongoing Maintenance Subtotal": `$${recurringSub.toFixed(2)}`,
            "Ongoing Maintenance HST (13%)": `$${recurringTax.toFixed(2)}`,
            "Ongoing Maintenance Total": `$${recurringTotal.toFixed(2)}`
          }
        : {
            "Subtotal": `$${standardSubtotal.toFixed(2)}`,
            "HST (13%)": `$${standardTax.toFixed(2)}`,
            "Grand Total": `$${standardTotal.toFixed(2)}`
          }),

      "Minimum Fee Floor Triggered": minFeeApplied ? "Yes ($100 floor enforced)" : "No",
      "Submitted At": new Date().toLocaleString()
    };

    // 4. Send Lead to WEB3FORMS
    fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...leadData })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Formspree rejected submission");
        return res.json();
      })
      .then(() => {
        // Hide Step 2 & Reveal Result Card
        step2.style.display = "none";
        resultDiv.style.display = "block";

        if (resultCustomThankYou) {
          resultCustomThankYou.innerHTML = `Thanks, <strong>${name}</strong>! Here is your customized instant estimate. Our team will follow up shortly to confirm availability.`;
        }

        if (summaryRooms) summaryRooms.textContent = `${sqft.toLocaleString()} sq ft (${bedsText}, ${bathsText})`;
        if (summaryFrequency) summaryFrequency.textContent = freqLabel;
        if (summaryAddons) {
          summaryAddons.textContent = selectedAddonsList.length > 0 ? selectedAddonsList.join(", ") : "None";
        }

        const singleCard = document.getElementById("single-pricing-card");
        const recurringCard = document.getElementById("recurring-pricing-card");
        const taxLabelText = companyConfig.tax?.label || "HST (13%):";

        const walkthroughCard = document.getElementById("walkthrough-card");
        const ctaContainer = document.getElementById("summary-cta-container");
        const minNoteEl = document.getElementById("minimum-fee-note");

        if (isWalkthrough) {
          // 1. Hide pricing cards and booking CTA
          if (singleCard) singleCard.style.display = "none";
          if (recurringCard) recurringCard.style.display = "none";
          if (minNoteEl) minNoteEl.style.display = "none";
          if (ctaContainer) ctaContainer.style.display = "none";

          // 2. Show Walk-through message
          if (walkthroughCard) walkthroughCard.style.display = "block";

          // 3. Update confirmation headline & home summary
          if (resultCustomThankYou) {
            resultCustomThankYou.innerHTML = `Thanks, <strong>${name}</strong>! We've received your home details. Our team will call you shortly to arrange your on-site walk-through.`;
          }
          if (summaryRooms) {
            summaryRooms.textContent = `4,000+ sq ft (${bedsText}, ${bathsText})`;
          }
        } else {
          // Standard estimate view (under 4,100 sq ft)
          if (walkthroughCard) walkthroughCard.style.display = "none";
          if (ctaContainer) ctaContainer.style.display = "none";

          if (isRecurring && recurringCard) {
            if (singleCard) singleCard.style.display = "none";
            recurringCard.style.display = "block";

            document.getElementById("first-subtotal-display").textContent = `$${firstVisitSub.toFixed(2)}`;
            document.getElementById("first-tax-label").textContent = taxLabelText;
            document.getElementById("first-tax-display").textContent = `$${firstVisitTax.toFixed(2)}`;
            document.getElementById("first-total-display").textContent = `$${firstVisitTotal.toFixed(2)}`;

            document.getElementById("recurring-subtotal-display").textContent = `$${recurringSub.toFixed(2)}`;
            document.getElementById("recurring-tax-label").textContent = taxLabelText;
            document.getElementById("recurring-tax-display").textContent = `$${recurringTax.toFixed(2)}`;
            document.getElementById("recurring-total-display").textContent = `$${recurringTotal.toFixed(2)}`;
          } else {
            if (recurringCard) recurringCard.style.display = "none";
            if (singleCard) singleCard.style.display = "block";

            document.getElementById("summary-subtotal").textContent = `$${standardSubtotal.toFixed(2)}`;
            document.getElementById("summary-tax-label").textContent = taxLabelText;
            document.getElementById("summary-tax").textContent = `$${standardTax.toFixed(2)}`;
            summaryTotal.textContent = `$${standardTotal.toFixed(2)}`;
          }

          if (minNoteEl) {
            minNoteEl.style.display = minFeeApplied ? "block" : "none";
          }
        }
        notifyParentOfResize();
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        if (errorMsg) {
          errorMsg.textContent = "There was an error generating your quote. Please try again.";
          errorMsg.style.display = "block";
        }
        submitBtn.disabled = false;
        submitBtn.textContent = "Get Your Estimate Now";
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