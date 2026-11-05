# Project Backlog & Roadmap

## 🚀 Current Milestone
- [x] Pre-tax minimum visit threshold floor logic
- [x] Dynamic minimum fee transparency notice banner
- [x] Ontario 13% HST calculation on top of minimum base price
- [ ] Connect lead form submission to email/backend endpoint

---

## 🌍 SaaS Multi-Tenant Localization (Future Milestone)
*Goal: Allow subscriber businesses worldwide to configure regional rules via database/settings.*

- [ ] **Dynamic Currency Formatting**
  - Replace hardcoded `$` symbols in UI with `Intl.NumberFormat` utility helper.
  - Read `currencyCode` (e.g., USD, CAD, GBP, EUR) from tenant config.
- [ ] **Dynamic Tax Labels & Rates**
  - Pull regional tax labels (`HST`, `VAT`, `Sales Tax`, `GST`) dynamically from tenant profile.
  - Allow tenants to set their own decimal tax rates or toggle tax exempt status.
- [ ] **Pluggable Postal / Phone Masking**
  - Swap hardcoded Canadian/US postal code regex for a country-based pattern matcher.
  - Adapt phone number validation rules based on tenant locale.
- [ ] **Units of Measurement**
  - Support square feet (`sqft`) vs. square meters (`sqm`) based on tenant region.

---

## 💡 Ideas & Nice-to-Haves
- [ ] Add tooltips explaining add-on services on hover/tap.
- [ ] Export calculation breakdown to PDF receipt.

1st Visit Clean not 1st visit Deep Clean
1st time clean should be $50 dollars more than recurring price

Interactive map around the serving area they can search their address and we will confirm then produce a call to action of getting a quote

Remove instant quote at navbar

how do we encourage referals and market it as benefits for local inclusivity

