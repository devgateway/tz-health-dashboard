
import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image-chrome-fix'
import {hexToRgb, colorCodeByName} from './colorsUtil'
import {getMonthName, getQuarterLabel, diffPercentage} from '../../../../../api'

export const print = (reportType, state) => {
  const el = document.getElementById("map1");
  domtoimage.toPng(el)
    .then(function (dataUrl) {
      const image = dataUrl
      if (reportType === 'ward') {
        generateWardPDF(state, image)
      } else {
        const link = document.createElement('a')
          /*link.download = `test.png`
          link.href = dataUrl
          link.click()*/
        generateFacilityPDF(state, image)  
      }      
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}

const generateWardPDF = (state, image) => {

}

const generateFacilityPDF = (state, image) => {
  const {info, population, period, diagnoses, RMNCH} = state
  const facilityName = info.getIn(['name'])
  const facilityType = info.getIn(['type', 'name'])
  const wardName = info.getIn(['ward', 'name'])
  const districtName = info.getIn(['district', 'name'])
  const regionName = info.getIn(['region', 'name'])
  const doc = new jsPDF()
  const TAB_0 = 15
  const TAB_1 = 25
  const TAB_2 = 35
  const TAB_3 = 45
  const FONT_HEADER = 20
  const FONT_PAGE_HEADER = 13
  const FONT_HEADER_SPACE = 10
  let cursorY = 25
  const language = 'en' //this should be set from selected language
  const year = parseInt(period.get('y'))
  const quarter = parseInt(period.get('q'))
  const month = parseInt(period.get('m'))
  let current, currentLabel, prev, prevLabel;
  if (month) {
    current = month
    prev = (month == 1)? 12: month - 1
    currentLabel = `${getMonthName(month)} ${year}`
    const prevYear = (current==1)?year-1:year
    prevLabel = `${getMonthName(prev)} ${prevYear}`
  } else if (quarter) {
    current = quarter
    prev = (quarter == 1)? 4: quarter - 1
    const prevYear = (current==1) ? year-1 : year
    currentLabel = `${getQuarterLabel(current).start}-${getQuarterLabel(current).end} ${year}`
    prevLabel = `${getQuarterLabel(prev).start}-${getQuarterLabel(prev).end} ${prevYear}`
  } else {
    current = year
    prev = year - 1
    currentLabel = current.toString();
    prevLabel = prev;
  }

  //debugger
  //page header
  doc.setFontSize(FONT_PAGE_HEADER)
  doc.setTextColor(19, 88, 151)
  doc.text(10, cursorY, "Tanzania Health Data Report")
  const freq = period.get('q') ? 'Quarterly' : (period.get('m') ? 'Monthly' : 'Yearly')
  doc.text(150, cursorY, `${freq} Facility Report`)
  doc.setLineWidth(0.5)
  doc.setDrawColor(200, 200, 200)
  doc.line(10, cursorY+1, 200, cursorY+1)
  cursorY += 12
  //report header
  doc.setFontSize(FONT_HEADER)
  doc.setTextColor(138, 124, 103)
  doc.setFontType("bold")
  doc.text(10, cursorY, facilityName)
  doc.text(190 - (currentLabel.length * 3), cursorY, currentLabel)
  cursorY += 5
  
  //location breadcrumb
  doc.setDrawColor(204, 204, 204)
  doc.setFillColor(244, 242, 236)
  doc.rect(10, cursorY, 48, 14, 'FD')
  doc.rect(58, cursorY, 48, 14, 'FD')
  doc.rect(106, cursorY, 48, 14, 'FD')
  doc.rect(152, cursorY, 48, 14, 'FD') 
  doc.setTextColor(44, 72, 86)
  doc.setFontSize(9)
  doc.setFontType("normal")
  doc.text(12, cursorY+8, "Type: ")
  doc.setFontType("bold")
  doc.text(22, cursorY+8, facilityType)
  doc.setFontType("normal")
  doc.text(60, cursorY+8, "Ward: ")
  doc.setFontType("bold")
  doc.text(70, cursorY+8, wardName)
  doc.setFontType("normal")
  doc.text(108, cursorY+8, "District: ")
  doc.setFontType("bold")
  doc.text(120, cursorY+8, districtName)
  doc.setFontType("normal")
  doc.text(154, cursorY+8, "Region: ")
  doc.setFontType("bold")
  doc.text(165, cursorY+8, regionName)
  cursorY += 20
  //poulation box//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //map
    doc.addImage(image, 'PNG', 85, cursorY-5, 120, 120)
  doc.setFontSize(14)
  doc.setTextColor(44, 164, 196)
  doc.setFontType("bold");
  doc.text(10, cursorY, `Availability of Health Services`)
  cursorY += 6
  doc.text(10, cursorY, `in ${regionName} region`)
  cursorY += 10
  doc.setFontSize(20)
  doc.setTextColor(44, 72, 86)
  doc.setFontType("bold");
  const totalPop = population.getIn(['data', 'total']).toString()
  doc.text(10, cursorY, `${totalPop}`)
  doc.setFontSize(14)
  doc.text(15 + (totalPop.length*3), cursorY, ' Total Population')
  cursorY += 8

  doc.setFontSize(9)
  doc.setTextColor(44, 44, 44)
  doc.setFontType("bold");
  doc.text(10, cursorY, `by Gender`)
  cursorY += 7
  doc.setDrawColor(200, 200, 200)
  doc.line(29, cursorY-2, 29, cursorY+12)
  doc.line(47, cursorY-2, 47, cursorY+12)
  doc.setFontSize(8)
  doc.setTextColor(180, 181, 168)
  doc.setFontType("bold");
  doc.text(16, cursorY, `Male`)
  doc.text(33, cursorY, `Female`)
  cursorY += 8
  doc.setFontSize(14)
  doc.setTextColor(109, 114, 128)
  const totalMale = population.getIn(['data', 'totalMale'])
  const totalFemale = population.getIn(['data', 'totalFemale'])
  doc.text(18 - (totalMale.toString().length), cursorY, `${totalMale}`)
  doc.text(36 - (totalFemale.toString().length), cursorY, `${totalFemale}`)
  cursorY += 8
  doc.setFontSize(9)
  doc.setTextColor(44, 44, 44)
  doc.text(10, cursorY, `by Age`)
  cursorY += 7
  doc.setDrawColor(200, 200, 200)
  doc.line(29, cursorY-2, 29, cursorY+12)
  doc.line(47, cursorY-2, 47, cursorY+12)
  doc.line(65, cursorY-2, 65, cursorY+12)
  doc.setFontSize(8)
  doc.setTextColor(180, 181, 168)
  doc.text(16, cursorY, `<5`)
  doc.text(34, cursorY, `5-60`)
  doc.text(53, cursorY, `>60`)
  cursorY += 8
  doc.setFontSize(14)
  doc.setTextColor(109, 114, 128)
  const totalUnder5 = population.getIn(['data', 'totalUnder5'])
  const total5to60 = population.getIn(['data', 'total5to60'])
  const totalAbove60 = population.getIn(['data', 'totalAbove60'])
  doc.text(18 - (totalUnder5.toString().length), cursorY, `${totalUnder5}`)
  doc.text(36 - (total5to60.toString().length), cursorY, `${total5to60}`)
  doc.text(54 - (totalAbove60.toString().length), cursorY, `${totalAbove60}`)
  cursorY += 25
  doc.setDrawColor(200, 200, 200)
  doc.line(10, cursorY, 200, cursorY)
  cursorY += 20

  //OPD diagnoses//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  doc.setFontSize(14)
  doc.setTextColor(44, 164, 196)
  doc.text(10, cursorY, `Out-Patient Diseases (OPD) at ${facilityName}`)
  cursorY += 15
  const deseases = diagnoses.get('data')? diagnoses.get('data').sortBy((val)=>-val.get('total')) : [];
  let colsTotals = {
    totalUnder5: 0,
    total5to60: 0,
    totalAbove60: 0,
    totalPrevPeriod: 0,
    total: 0
  }

  doc.setFillColor(244, 242, 236)
  doc.rect(98, cursorY-7, 63, 20 + (diagnoses.get('data').size * 5), 'F')
  
  doc.setTextColor(19, 88, 151)
  doc.text(20, cursorY, `Top Ten Diagnoses`)
  cursorY -= 2
  doc.setFontSize(12)
  doc.setTextColor(109, 114, 128)
  doc.text(85 - prevLabel.toString().length, cursorY, `${prevLabel}`)
  doc.text(170, cursorY, `% Change`)
  doc.setTextColor(156, 133, 104)
  doc.text(130 - currentLabel.toString().length, cursorY, `${currentLabel}`)
  cursorY += 4
  doc.setFontSize(9)
  doc.setFontType('normal')
  doc.setTextColor(109, 114, 128)
  doc.text(78, cursorY, `Total Count`)
  doc.setTextColor(180, 181, 168)
  doc.text(100, cursorY, `Age< 5`)
  doc.text(115, cursorY, `Age5-60`)
  doc.text(130, cursorY, `Age>60`)
  doc.setTextColor(109, 114, 128)
  doc.text(143, cursorY, `Total Count`)
  doc.text(162, cursorY, `Total Cases since Last Year`)
  cursorY += 2
  doc.setLineWidth(0.25)
  doc.line(10, cursorY, 200, cursorY)
  
  deseases.forEach((it) => {
    cursorY += 5
    const label = it.getIn(['diagnostic','name'])
    const translation=it.getIn(['diagnostic','translations']).find(e=>e.get('locale')==language);
    const totalUnder5 = it.getIn(['ranges', 'totalUnder5'])
    const total5to60 = it.getIn(['ranges', 'total5to60'])
    const totalAbove60 = it.getIn(['ranges', 'totalAbove60'])
    const totalPrevPeriod = it.getIn(['totalPrevPeriod'])
    const total = it.get("total");
    colsTotals['totalUnder5'] += totalUnder5
    colsTotals['total5to60'] += total5to60
    colsTotals['totalAbove60'] += totalAbove60
    colsTotals['totalPrevPeriod'] += totalPrevPeriod
    colsTotals['total'] += total
    doc.setFontSize(11)
    doc.setTextColor(44, 72, 86)
    doc.setFontType("bold");
    doc.text(10, cursorY, `${(translation && translation.get('value')) ? translation.get('value') :label}`)
    const prevValueLabel = it.get("totalPrevPeriod") || 'N/A'
    doc.text(85 - prevValueLabel.toString().length, cursorY, `${prevValueLabel}`)
    doc.setTextColor(180, 181, 168)
    doc.text(105 - totalUnder5.toString().length, cursorY, `${totalUnder5}`)
    doc.text(120 - total5to60.toString().length, cursorY, `${total5to60}`)
    doc.text(135 - totalAbove60.toString().length, cursorY, `${totalAbove60}`)
    doc.setTextColor(44, 72, 86)
    doc.text(150 - total.toString().length, cursorY, `${total}`)
    const diffValue = diffPercentage(it.get("totalPrevPeriod"),total)
    doc.text(178 - diffValue.toString().length, cursorY, `${diffValue}`)
  })
  cursorY += 2
  doc.line(10, cursorY, 200, cursorY)
  cursorY += 5
  doc.setTextColor(44, 72, 86)
  doc.text(50, cursorY, `Total`)
  let totalPrevValueLabel = colsTotals['totalPrevPeriod'] || 'N/A'
  doc.text(85 - totalPrevValueLabel.toString().length, cursorY, `${totalPrevValueLabel}`)
  doc.setTextColor(180, 181, 168)
  doc.text(105 - colsTotals['totalUnder5'].toString().length, cursorY, `${colsTotals['totalUnder5']}`)
  doc.text(120 - colsTotals['total5to60'].toString().length, cursorY, `${colsTotals['total5to60']}`)
  doc.text(135 - colsTotals['totalAbove60'].toString().length, cursorY, `${colsTotals['totalAbove60']}`)
  doc.setTextColor(44, 72, 86)
  doc.text(150 - colsTotals['total'].toString().length, cursorY, `${colsTotals['total']}`)
  let diffTotalValue = diffPercentage(colsTotals['totalPrevPeriod'],colsTotals['total'])
  doc.text(178 - diffTotalValue.toString().length, cursorY, `${diffTotalValue}`)
  cursorY += 2
  doc.setLineWidth(0.5)
  doc.line(10, cursorY, 200, cursorY)
  
  doc.addPage()
  cursorY = 25
  //page header
  doc.setFontSize(FONT_PAGE_HEADER)
  doc.setTextColor(19, 88, 151)
  doc.text(10, cursorY, "Tanzania Health Data Report")
  doc.text(150, cursorY, `${freq} Facility Report`)
  doc.setLineWidth(0.5)
  doc.setDrawColor(200, 200, 200)
  doc.line(10, cursorY+1, 200, cursorY+1)
  cursorY += 12
  //report header
  doc.setFontSize(FONT_HEADER)
  doc.setTextColor(138, 124, 103)
  doc.setFontType("bold")
  doc.text(10, cursorY, facilityName)
  doc.text(190 - (currentLabel.length * 3), cursorY, currentLabel)
  cursorY += 5
  doc.setDrawColor(200, 200, 200)
  doc.line(10, cursorY, 200, cursorY)
  cursorY += 20

  //RMNCH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  doc.setFontSize(14)
  doc.setTextColor(44, 164, 196)
  doc.text(10, cursorY, `Reproductive Maternal, Newborn and Child Health at ${facilityName}`)
  cursorY += 15

  doc.setFillColor(244, 242, 236)
  doc.rect(138, cursorY-7, 30, 20 + (RMNCH.get('data').size * 5), 'F')
  doc.setTextColor(19, 88, 151)
  doc.text(40, cursorY, `RMNCH Services`)
  cursorY -= 2
  doc.setFontSize(12)
  doc.setTextColor(109, 114, 128)
  doc.text(122 - prevLabel.toString().length, cursorY, `${prevLabel}`)
  doc.text(172, cursorY, `% Change`)
  doc.setTextColor(156, 133, 104)
  doc.text(152 - currentLabel.toString().length, cursorY, `${currentLabel}`)
  cursorY += 4
  doc.setFontSize(9)
  doc.setFontType('normal')
  doc.setTextColor(109, 114, 128)
  doc.text(118, cursorY, `Count`)
  doc.text(148, cursorY, `Count`)
  doc.text(173, cursorY, `since ${prevLabel}`)
  cursorY += 2
  doc.setLineWidth(0.25)
  doc.line(10, cursorY, 200, cursorY)
  let totalPrevious = 0
  let totalCurrent = 0
  RMNCH.get('data').forEach(it => {
    cursorY += 5
    const indicatorLabel = it.getIn(['indicator','name'])
    const translation=it.getIn(['indicator','translations']).find(e=>e.get('locale')==language);
    totalPrevious += it.get('totalPrevPeriod')
    totalCurrent += it.get('value')
    doc.setFontSize(11)
    doc.setTextColor(44, 72, 86)
    doc.setFontType("bold");
    doc.text(10, cursorY, `${(translation && translation.get('value')) ? translation.get('value') :indicatorLabel}`)
    const prevValueLabel = it.get("totalPrevPeriod") || 'N/A'
    doc.text(122 - prevValueLabel.toString().length, cursorY, `${prevValueLabel}`)
    const currentValue = it.get('value') || 'N/A'
    doc.text(152 - currentValue.toString().length, cursorY, `${currentValue}`)
    const diffValue = diffPercentage(it.get("totalPrevPeriod"), currentValue)
    doc.text(180 - diffValue.toString().length, cursorY, `${diffValue}`)
  })
  cursorY += 2
  doc.line(10, cursorY, 200, cursorY)
  cursorY += 5
  doc.setTextColor(44, 72, 86)
  doc.text(100, cursorY, `Total`)
  totalPrevValueLabel = totalPrevious || 'N/A'
  doc.text(122 - totalPrevValueLabel.toString().length, cursorY, `${totalPrevValueLabel}`)
  const totalValueLabel = totalCurrent || 'N/A'
  doc.text(152 - totalValueLabel.toString().length, cursorY, `${totalValueLabel}`)
  diffTotalValue = diffPercentage(totalPrevious, totalCurrent)
  doc.text(180 - diffTotalValue.toString().length, cursorY, `${diffTotalValue}`)
  cursorY += 2
  doc.setLineWidth(0.5)
  doc.line(10, cursorY, 200, cursorY)



  doc.save(`${facilityName}.pdf`)
}


const getPeriodName = (period) => {
  let periodName = ''
  if (period.get('q')) {
    switch(period.get('q')) {
      case "1":
        periodName = 'January-March'
        break;
      case "2":
        periodName = 'April-June'
        break;
      case "3":
        periodName = 'July-September'
        break;
      case "4":
        periodName = 'October-December'
        break;
    }
  } else if (period.get('m')) {
     switch(period.get('q')) {
      case "1":
        periodName = 'January'
        break;
      case "2":
        periodName = 'February'
        break;
      case "3":
        periodName = 'March'
        break;
      case "4":
        periodName = 'April'
        break;
      case "5":
        periodName = 'May'
        break;
      case "6":
        periodName = 'June'
        break;
      case "7":
        periodName = 'July'
        break;
      case "8":
        periodName = 'August'
        break;
      case "9":
        periodName = 'September'
        break;
      case "10":
        periodName = 'October'
        break;
      case "11":
        periodName = 'November'
        break;
      case "12":
        periodName = 'December'
        break;  
    } 
  }
  return periodName
}