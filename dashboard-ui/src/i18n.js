import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "Dashboard": "Dashboard",
        "Map": "Map",
        "Top Ten Diagnoses": "Top Ten Diagnoses",
        "Total": "Total",
        "Total Count": "Total Count",
        "Age": "Age",
        "Total Count": "Total Count",
        "in Total Cases since": "in Total Cases since",
        "Out-Patient Diseases (OPD) at": "Out-Patient Diseases (OPD) in",
        "Change": "Change",
        "Data Report Generator": "Data Report Generator",
        "Landing description": "This dashboard visualizes key information from Tanzania's health information management system, dhis2. You can explore and download subnational data on service populations; out-patient diseases; and reproductive, maternal, newborn, and child health.",
        "Use the buttons below":"Use the buttons below to dive deeper into the data, by either an individual facility or ward.",
        "Facility Report Generator": "Facility Report Generator",
        "Ward Report Generator": "Ward Report Generator",
        "This portal is managed by the President’s Office - Regional Administration and Local Government (PORALG), in partnership with the Ministry of Health, Community Development, Gender, Elderly and Children (MoHCDGEC). Development Gateway developed the dashboard, with financial support from the Bill & Melinda Gates Foundation and technical support from DataVision International.": "This portal is managed by the President’s Office - Regional Administration and Local Government (PORALG), in partnership with the Ministry of Health, Community Development, Gender, Elderly and Children (MoHCDGEC). Development Gateway developed the dashboard, with financial support from the Bill & Melinda Gates Foundation and technical support from DataVision International.",
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
        "ward": "ward",
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
        "region": "region",
        "Availability of Health Services in": "Availability of Health Services in",
        "Availability of Health Services": "Availability of Health Services",
        "in": "in",
        "Total Population": "Total Population",
        "by Gender": "by Gender",
        "Male": "Male",
        "Female": "Female",
        "by Age": "by Age",
        "Other": "Other",
        "in same region": "in same region",
        "Other Facility in ward": "Other Facility in ward",
        "Legend": "Legend",

        "district boundary": "District boundary",
        "ward boundary": "Ward boundary",
        "region boundary": "Region boundary",

        "Reproductive Maternal, Newborn and Child Health at": "Reproductive Maternal, Newborn and Child Health in",
        "Total Health Facilities": "Total Health Facilities",
        "Public": "Public",
        "Private": "Private",
        "Faith Based": "Faith Based",
        "Parastatal": "Parastatal",
        "Defense": "Defense",
        "Facility in": "Facilities in",
        "Facility in other ward": "Facilities in other wards",
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
        "Create a custom data report for a ward": "Create a custom data report for a ward",
        "Create a custom data report for a health facility": "Create a custom data report for a health facility",
        "Step one": "Step One",
        "Select a ward": "Select a ward",
        "Select a facility": "Select a facility",
        "by typing it name in the": "by typing its name in the",
        "ward search": "Ward Search",
        "facility search": "Facility Search",
        "below": "below",
        "OR": "OR",
        "by location using the": "by location using the",
        "ward filter": "Ward Filter",
        "facility filter": "Facility Filter",
        "box or map below": "box or map below",
        "Step Two": "Step Two",
        "Select a Timeframe": "Select a Timeframe",
        "Date Filter": "Date Filter",
        "After selecting a ward select the time period (yearly, quarterly, or monthly) and desired dates": "Select the time period (yearly, quarterly, or monthly) and desired date range for the data",
        "After selecting a facility select the time period (yearly, quarterly, or monthly) and desired dates": "Select the time period (yearly, quarterly, or monthly) and desired date range for the data",
        "Time Period": "Time Period",
        "Date": "Date",
        "Click on the": "Click on the",
        "Generate Report": "Generate Report",
        "button to create your custom data report, or click on the": "button to create your custom data report, or click on the",
        "Reset": "Reset",
        "button to clear all search and filter selections": "button to clear all search and filter selections",
        "The": "The",
        "Generate Report": "Generate Report",
        "Help facility Report Generator.": "will not engage until you have selected a valid facility, time period, and date. First, select a ward, either through the search or filter boxes in Step One, then select a time period in Step Two.",
        "Help ward Report Generator.": "will not engage until you have selected a valid ward, time period, and date. First, select a ward, either through the search or filter boxes in Step One, then select a time period in Step Two.",
        "Copy link to share": "Copy link to share",
        "Print as PDF": "Print as PDF",
        "Jan": "Jan",
        "Feb": "Feb",
        "Mar": "Mar",
        "Apr": "Apr",
        "May": "May",
        "Jun": "Jun",
        "Jul": "Jul",
        "Aug": "Aug",
        "Sep": "Sep",
        "Oct": "Oct",
        "Nov": "Nov",
        "Dec": "Dec",
        "Back to generator": "Back to generator",
        "Source": "Source",
        "census 2012": "Source: census:  2012",
        "Total population in facility catchment": "Total population in facility catchment",
        "Others":"Others",
        "hospitals":"hospitals ",
        "health centers":"health centers",
        "clinics":"clinics",
        "dispensaries":"dispensaries",
        "in same":"in same"
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
        "in Total Cases since":"katika Idadi ya Wagonjwa Wote tangu",
        "Change":"Badilisha",
        "Data Report Generator": "Jenerator ya taarifa ya data",
        "Landing description": "Dashibodi hii inaonesha habari muhimu kutoka kwenye mfumo wa taarifa za afya Tanzania, dhis2. Unaweza kuchunguza na kupakua taarifa za wilaya na kata juu ya idadi ya wanaohudumiwa, magonjwa ya nje, huduma za uzazi na afya ya mama na mtoto.",
        "Use the buttons below":"Bonyeza kitufe kifuatacho kuingia kiundani kupata taarifa za kutuo binafsi au kwa kata.",
        "Facility Report Generator": "Muundo wa taarifa ya kituo",
        "Ward Report Generator": "Muundo wa taarifa ya kata",
        "This portal is managed by the President’s Office - Regional Administration and Local Government (PORALG), in partnership with the Ministry of Health, Community Development, Gender, Elderly and Children (MoHCDGEC). Development Gateway developed the dashboard, with financial support from the Bill & Melinda Gates Foundation and technical support from DataVision International.": "Hifadhi hii inasimamiwa na Ofisi ya Rais - Utawala wa Mikoa na Serikali za Mitaa (PORALG), kwa kushirikiana na Wizara ya Afya, Maendeleo ya Jamii, Jinsia, Wazee na Watoto (MoHCDGEC). Development Gateway ilianzisha dashibodi, na msaada wa kifedha kutoka Foundation ya Bill & Melinda Gates na msaada wa kiufundi kutoka DataVision International.",
        "facility report generator": "Muundo wa taarifa ya kituo",
        "ward report generator": "Muundo wa taarifa ya kata",
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
        "ward": "kata",
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
        "region": "mkoa",
        "Availability of Health Services in": "Upatikanaji wa Huduma za Afya katika ",
        "Availability of Health Services": "Upatikanaji wa Huduma za Afya ",
        "in": "katika",
        "Total Population": "Idadi ya Watu",
        "by Gender": "kwa Jinsi",
        "Male": "Wakiume",
        "Female": "Wakike",
        "by Age": "kwa Umri",
        "Other": "Nyingine",
        "in same region": "Katika mkoa huo",
        "Other Facility in ward": "Vituo katika kata nyingine",
        "Legend": "Ufunguo",
        "district boundary": "Mipaka ya Wilaya",
        "ward boundary": "Mipaka ya Kata",
        "region boundary": "Mipaka ya Mkoa",

        "Reproductive Maternal, Newborn and Child Health at": "Afya ya uzazi, mama, mtoto mchanga na afya ya mtoto katika ",
        "Total Health Facilities": "Idadi ya vituo vya afya",
        "Public": "Umma",
        "Private": "Binafisi",
        "Faith Based": "ya kidini",
        "Parastatal": "Shirika la umma",
        "Defense": "Ulinzi",
        "Facility in": "Vituo katika",
        "Facility in other ward": "Vituo katika kata nyingine",
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
        "Hospital": "Hospitali",
        "Clinics": "Kliniki",
        "Search and filter facility-level data to generate a monthly, quarterly, or annual health data report.": "Saka na Pakua data ya kituo ili kutoa ripoti ya data ya kila mwezi, ya kila mwaka, au kila mwaka.",
        "Search and filter ward-level data to generate a monthly, quarterly, or annual health data report.": "Saka na Pakua data ya kata ili kutoa ripoti ya data ya kila mwezi, ya kila mwaka, au kila mwaka.",

        "Create a custom data report for a ward": "Tengeneza taarifa mahususi ya kata",
        "Create a custom data report for a health facility": "Tengeneza taarifa mahususi ya kituo cha afya ",
        "Step one": "Hatua ya kwanza",
        "Select a ward": "Chagua Kata",
        "Select a facility": "Chagua Kituo",
        "by typing it name in the": "kwa kuandika jina katika",
        "ward search": "Chunga Kata",
        "facility search": "Chunga Kituo",
        "below": "chini",
        "OR": "AU",
        "by location using the": "na Maeneo kwa kutumia",
        "ward filter": "Chunga Kata",
        "facility filter": "Chunga Kituo",
        "box or map below": "kisanduku au ramani hapa chini",
        "Step Two": "Hatua ya Pili",
        "Select a Timeframe": "Chagua muda",
        "Date Filter": "Chagua Tarehe",
        "After selecting a ward select the time period (yearly, quarterly, or monthly) and desired dates": "Baada ya kuchagua kata kuchagua kipindi (kila mwaka, robo mwaka, au kila mwezi) na tarehe ya taka",
        "After selecting a facility select the time period (yearly, quarterly, or monthly) and desired dates": "Baada ya kuchagua kituo kuchagua kipindi (kila mwaka, robo mwaka, au kila mwezi) na tarehe ya taka",
        "Time Period": "Muda",
        "Date": "Tarehe",
        "Click on the": "Bonyeza kwenye",
        "Generate Report": "Toa Taarifa",
        "button to create your custom data report, or click on the": "kibonyezo la unda taarifa data maalum, au bonyeka kwenye",
        "Reset": "Rejesha",
        "button to clear all search and filter selections": "kibonyezo la kuondoa chaguo zilizopo",
        "The": "Ya",
        "Generate Report": "Toa Taarifa",
        "Help facility Report Generator.":"Hutajihusisha mpaka kuchaguliwa kata halali, kipindi cha muda, na tarehe. Kwanza, chagua Kituo, ama kwa njia ya utafutaji au kutumia masanduku ya kuchagua kituo katika Hatua ya Kwanza, kisha kuchagua kipindi cha muda katika hatua ya pili.",
        "Help ward Report Generator.": "Hutajihusisha mpaka kuchaguliwa kata halali, kipindi cha muda, na tarehe. Kwanza, chagua kata, ama kwa njia ya utafutaji au kutumia masanduku ya kuchagua kata katika Hatua ya Kwanza, kisha kuchagua kipindi cha muda katika hatua ya pili.",
        "Copy link to share": "Copy link to share",
        "Print as PDF": "Print as PDF",
        "Jan": "Jan",
        "Feb": "Feb",
        "Mar": "Mar",
        "Apr": "Apr",
        "May": "Mei",
        "Jun": "Jun",
        "Jul": "Jul",
        "Aug": "Ago",
        "Sep": "Sep",
        "Oct": "Okt",
        "Nov": "Nov",
        "Dec": "Des",
        "Back to generator": "Rudi kwenye ukurasa wa kutoa taarifa",
        "Source": "Kutoka",
        "census 2012": "Tarakimu ya sensa 2012",
        "Total population in facility catchment": "Jumla ya idadi ya watu wanaopaswa kuhudumiwa kwa kituo hiki",
        "Others":"Nyingine",
        "hospitals":"hospitali ",
        "health centers":"vituo vya afya",
        "clinics":"kliniki",
        "dispensaries":"zahanati",
        "in same":"katika"
      }
    }
  },
  fallbackLng: "sw",
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
