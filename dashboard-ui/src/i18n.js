import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "Dashboard":"Dashboard",
        "Map":"Map",
        "Top Ten Diagnoses":"Top Ten Diagnoses",
        "Total":"Total",
        "Total Count":"Total Count",
        "Age":"Age",
        "Total Count":"Total Count",
        "in Total Cases since Last Year":"in Total Cases since Last Year",
        "Out-Patient Diseases (OPD) at":"Out-Patient Diseases (OPD) at",
        "Change":"Change"
      }
    },
    sw: {
      translations: {
        "Dashboard":"Dashibodi",
        "Map":"Ramani",
        "Top Ten Diagnoses":"Vipimo vya Juu kumi",
        "Out-Patient Diseases (OPD) at":"Magonjwa ya Kati-mgonjwa (OPD)",
        "Total":"Jumla",
        "Total Count":"Jumla ya Hesabu",
        "Age":"Umri",
        "in Total Cases since Last Year":"katika kesi zote tangu mwaka jana",
        "Change":"Badilisha"
      }
    }
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
