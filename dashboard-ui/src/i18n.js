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
        "Change":"Change",
        "Data Report Generator": "Data Report Generator",
        "This dashboard visualizes key information from Tanzania’s health information management system, dhis2. You can explore and download subnational data on service populations; out-patient diseases; reproductive, maternal, newborn, and child health; health financing; staffing; and community deaths. Use the buttons below to dive deeper into the data, by either an individual facility or ward.": 
          "This dashboard visualizes key information from Tanzania’s health information management system, dhis2. You can explore and download subnational data on service populations; out-patient diseases; reproductive, maternal, newborn, and child health; health financing; staffing; and community deaths. Use the buttons below to dive deeper into the data, by either an individual facility or ward.",
        "Facility Report Generator": "Facility Report Generator",
        "Ward Report Generator": "Ward Report Generator",
        "This portal is managed by the President’s Office - Regional Administration and Local Government (PORALG), in partnership with the Ministry of Health, Community Development, Gender, Elderly and Children (MoHCDGEC). Development Gateway developed the dashboard, with financial support from the Bill & Melinda Gates Foundation and technical support from DataVision International.":
          "This portal is managed by the President’s Office - Regional Administration and Local Government (PORALG), in partnership with the Ministry of Health, Community Development, Gender, Elderly and Children (MoHCDGEC). Development Gateway developed the dashboard, with financial support from the Bill & Melinda Gates Foundation and technical support from DataVision International.",
        "facility report generator": "facility report generator",
        "ward report generator": "ward report generator", 
        "Create a custom data report for a ward by ": "Create a custom data report for a ward by ",
        "Selecting a Ward ": "Selecting a Ward ", 
        "by typing its name in the ": "by typing its name in the ",
        "Ward Search ": "Ward Search ",
        "or filtering by location using the ": "or filtering by location using the ",
        "Ward Filter ": "Ward Filter ",
        "and map, and then ": "and map, and then ",
        "Selecting a Time Period ": "Selecting a Time Period ",
        "in the ": "in the ",
        "Date Filter section ": "Date Filter section ",
        "Create a custom data report for a health facility by ": "Create a custom data report for a health facility by ",
        "Selecting a Facility ": "Selecting a Facility ", 
        "Facility Search ": "Facility Search ",
        "Facility Filter ": "Facility Filter ",
        "Regions": "Regions",
        "Districts": "Districts",
        "Wards": "Wards",
        "Facilities": "Facilities",
        "Select a region": "Select a region",
        "Select a district": "Select a district",
        "Select a ward": "Select a ward",
        "Select a facility": "Select a facility",
        "Generate Report": "Generate Report",
        "Facility Type": "Facility Type",
        "Ward": "Ward",
        "District": "District",
        "Region": "Region",
        "Availability of Health Services in": "Availability of Health Services in",
        "Total Population": "Total Population",
        "by Gender": "by Gender",
        "Male": "Male",
        "Female": "Female",
        "by Age": "by Age",
        "Other": "Other",
        "in same region": "in same region",
        "Other Facility in ward": "Other Facility in ward",
        "Legend": "Legend",
        "District boundary": "District boundary",
        "Ward boundary": "Ward boundary",
        "Reproductive Maternal, Newborn and Child Health at": "Reproductive Maternal, Newborn and Child Health at",
        "Total Health Facilities": "Total Health Facilities",
        "Public": "Public",
        "Private": "Private",
        "Faith Based": "Faith Based",
        "Parastatal": "Parastatal",
        "Defense": "Defense",
        "Facility in": "Facility in",
        "Facility in other ward": "Facility in other ward",
        "Monthly": "Monthly",
        "Quarterly": "Quarterly",
        "Yearly": "Yearly",
        "Select a period": "Select a period",
        "RMNCH Services": "RMNCH Services",
        "Count": "Count",
        "since": "since",
        "Faith": "Faith",
        "Based": "Based",
        "Tanzania Health Data Report": "Tanzania Health Data Report",
        "Ward Report": "Ward Report",
        "Facility Report": "Facility Report",
        "Type": "Type",
        "ward filter": "ward filter ",
        "facility filter": "facility filter ",
        "ward search": "ward search",
        "facility search": "facility search",
        "Search and filter facility-level data to generate a monthly, quarterly, or annual health data report.": "Search and filter facility-level data to generate a monthly, quarterly, or annual health data report.",
        "Search and filter ward-level data to generate a monthly, quarterly, or annual health data report.": "Search and filter ward-level data to generate a monthly, quarterly, or annual health data report.",
        "Increasing": "Increasing",
        "Decreasing": "Decreasing",
        "Search by name": "Search by name",
        "January": "January",
        "February": "February",
        "March": "March",
        "April": "April",
        "May": "May",
        "June": "June",
        "July": "July",
        "August": "August",
        "September": "September",
        "October": "October",
        "November": "November",
        "December": "December",
        "Health Center": "Health Center",
        "Dispensary": "Dispensary",
        "Hospital": "Hospital",
        "Clinics": "Clinics",

      } 
    },
    sw: {
      translations: {
        "Dashboard":"Dashibodi",
        "Map":"Ramani",
        "Top Ten Diagnoses":"Vipimo vya Juu kumi",
        "Out-Patient Diseases (OPD) at": "Idara ya Wagonjwa wa Nje (OPD) katika",
        "Total":"Jumla",
        "Total Count":"Jumla ya Hesabu",
        "Age":"Umri",
        "in Total Cases since Last Year":"katika kesi zote tangu mwaka jana",
        "Change":"Badilisha",
        "Data Report Generator": "Jenerator ya taarifa ya data",
        "This dashboard visualizes key information from Tanzania’s health information management system, dhis2. You can explore and download subnational data on service populations; out-patient diseases; reproductive, maternal, newborn, and child health; health financing; staffing; and community deaths. Use the buttons below to dive deeper into the data, by either an individual facility or ward.": 
          "Dashibodi hii inaonyesha habari muhimu kutoka kwa mfumo wa usimamizi wa habari za afya Tanzania, dhis2. Unaweza kuchunguza na kupakua data ya kimataifa juu ya watu wa huduma; magonjwa ya nje; uzazi, uzazi, mtoto mchanga, na afya ya mtoto; fedha za afya; utumishi; na vifo vya jamii. Tumia vifungo chini ili kupiga mbizi zaidi ndani ya data, kwa ama kituo cha kibinafsi au kata.",
        "Facility Report Generator": "Jenerator ya taarifa ya Kituo",
        "Ward Report Generator": "Jenerator ya taarifa ya Kata",
        "This portal is managed by the President’s Office - Regional Administration and Local Government (PORALG), in partnership with the Ministry of Health, Community Development, Gender, Elderly and Children (MoHCDGEC). Development Gateway developed the dashboard, with financial support from the Bill & Melinda Gates Foundation and technical support from DataVision International.":
          "Hifadhi hii inasimamiwa na Ofisi ya Rais - Utawala wa Mikoa na Serikali za Mitaa (PORALG), kwa kushirikiana na Wizara ya Afya, Maendeleo ya Jamii, Jinsia, Wazee na Watoto (MoHCDGEC). Development Gateway ilianzisha dashibodi, na msaada wa kifedha kutoka Foundation ya Bill & Melinda Gates na msaada wa kiufundi kutoka DataVision International.",
        "facility report generator": "Jenerator ya taarifa ya kituo",
        "ward report generator": "Jenerator ya taarifa ya Kata", 
        "Create a custom data report for a ward by ": "Unda taarifa data maalum ya kata na ",
        "Selecting a Ward ": "Kuchagua Kata ", 
        "by typing its name in the ": "Kwa kuandika jina lake katika ",
        "Ward Search ": "Chagua Kata ",
        "or filtering by location using the ": "au kuchuja na maeneo kwa kutumia ",
        "Ward Filter ": "Chunga Kata ",
        "and map, and then ": "na ramani, kisha ",
        "Selecting a Time Period ": "Chagua Muda ",
        "in the ": "Ndani ya ",
        "Date Filter section ": "Chagua Tarehe ",
        "Create a custom data report for a health facility by ": "Unda taarifa data maalum ya kituo cha afya na ",
        "Selecting a Facility ": "Kuchagua kituo ", 
        "Facility Search ": "Chagua Kituo ",
        "Facility Filter ": "Chunga Kituo ",
        "Regions": "Mikoa",
        "Districts": "Wilaya",
        "Wards": "Kata",
        "Facilities": "Vituo",
        "Select a region": "Chagua Mkoa",
        "Select a district": "Chagua Wilaya",
        "Select a ward": "Chagua Kata",
        "Select a facility": "Chagua Kituo",
        "Generate Report": "Toa Taarifa",
        "Facility Type": "Aina ya Kituo",
        "Ward": "Kata",
        "District": "Wilaya",
        "Region": "Mkoa",
        "Availability of Health Services in": "Upatikanaji wa Huduma za Afya katika ",
        "Total Population": "Idadi ya Watu",
        "by Gender": "kwa Jinsi",
        "Male": "Wakiume",
        "Female": "Wakike",
        "by Age": "kwa Umri",
        "Other": "Nyingine",
        "in same region": "Katika mkoa huo",
        "Other Facility in ward": "Kituo katika kata nyingine",
        "Legend": "Ufunguo",
        "District boundary": "Mpaka wa Wilaya",
        "Ward boundary": "Mpaka wa kata",
        "Reproductive Maternal, Newborn and Child Health at": "Afya ya uzazi, mama, mtoto mchanga na afya ya mtoto katika ",
        "Total Health Facilities": "Idadi ya vituo vya afya",
        "Public": "Umma",
        "Private": "Binafisi",
        "Faith Based": "ya kidini",
        "Parastatal": "Shirika la umma",
        "Defense": "Ulinzi",
        "Facility in": "Kituo katika",
        "Facility in other ward": "Kituo katika kata nyingine",
        "Monthly": "Mwezi",
        "Quarterly": "Robo Mwaka",
        "Yearly": "Mwaka",
        "Select a period": "Chagua Kipindi",
        "RMNCH Services": "Huduma za RMNCH",
        "Count": "Iliopo",
        "since": "Tangu",
        "Faith": "ya",
        "Based": "kidini",
        "Tanzania Health Data Report": "Taarifa ya Takwimu za Afya Tanzania",
        "Ward Report": "Taarifa ya Kata",
        "Facility Report": "Taarifa ya Kituo",
        "Type": "Type",
        "ward filter": "Chunga Kata",
        "facility filter": "Chunga Kituo",
        "ward search": "Chagua Kata",
        "facility search": "Chagua Kituo",
        "Increasing": "Kuongezeka",
        "Decreasing": "Kupungua",
        "Search by name": "Tafuta kwa jina",
        "January": "Januari",
        "February": "Februari",
        "March": "Marchi",
        "April": "Aprili",
        "May": "Mei",
        "June": "Juni",
        "July": "Julai",
        "August": "Agosti",
        "September": "Septemba",
        "October": "Oktoba",
        "November": "Novemba",
        "December": "Desemba",
        "Health Center": "Kituo cha afya cha",
        "Dispensary": "Zahanati",
        "Hospital": "Hospital",
        "Clinics": "Clinics",
        "Search and filter facility-level data to generate a monthly, quarterly, or annual health data report.": "Saka na Pakua data ya kituo ili kutoa ripoti ya data ya kila mwezi, ya kila mwaka, au kila mwaka.",
        "Search and filter ward-level data to generate a monthly, quarterly, or annual health data report.": "Saka na Pakua data ya kata ili kutoa ripoti ya data ya kila mwezi, ya kila mwaka, au kila mwaka.",
        
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
