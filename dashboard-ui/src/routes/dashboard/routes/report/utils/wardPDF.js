import jsPDF from 'jspdf'
import {hexToRgb, colorCodeByName} from './colorsUtil'
import {getMonthName, getQuarterLabel, diffPercentage} from '../../../../../api'

export const generateWardPDF = (state, image) => {
  const {params: {id}, mapPoints, info, population, period, diagnoses, RMNCH} = state
  const wardName = info.getIn(['name'])
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
  const wardFacilities = []
  if (mapPoints) {
    mapPoints.forEach(f => {
      if (f.getIn(['ward', 'gid']) == id) {
        wardFacilities.push(f.toJS())
      }
    })
  }

  //totals by ownership types
  const totalPrivate = wardFacilities.filter(f => f.ownership.dhis2Id === 'UE4MHrqMzfd').length
  const totalFaithBased = wardFacilities.filter(f => f.ownership.dhis2Id === 'rj0MuRMJYCj').length
  const totalPublic = wardFacilities.filter(f => f.ownership.dhis2Id === 'm16TP0k7LVw').length
  const totalParastatal = wardFacilities.filter(f => f.ownership.dhis2Id === 'G6Mg194YpDy').length
  const totalDefence = wardFacilities.filter(f => f.ownership.dhis2Id === 'iTwLKcbi6BX').length


  //debugger
  //page header
  doc.setFontSize(FONT_PAGE_HEADER)
  doc.setTextColor(19, 88, 151)
  doc.text(10, cursorY, "Tanzania Health Data Report")
  const freq = period.get('q') ? 'Quarterly' : (period.get('m') ? 'Monthly' : 'Yearly')
  doc.text(150, cursorY, `${freq} Ward Report`)
  doc.setLineWidth(0.5)
  doc.setDrawColor(200, 200, 200)
  doc.line(10, cursorY+1, 200, cursorY+1)
  cursorY += 12
  //report header
  doc.setFontSize(FONT_HEADER)
  doc.setTextColor(138, 124, 103)
  doc.setFontType("bold")
  doc.text(10, cursorY, wardName)
  doc.text(190 - (currentLabel.length * 3), cursorY, currentLabel)
  cursorY += 5
  
  //location breadcrumb
  doc.setDrawColor(204, 204, 204)
  doc.setFillColor(244, 242, 236)
  doc.rect(10, cursorY, 63, 14, 'FD')
  doc.rect(73, cursorY, 63, 14, 'FD')
  doc.rect(136, cursorY, 64, 14, 'FD')
  doc.setTextColor(44, 72, 86)
  doc.setFontSize(9)
  doc.setFontType("normal")
  doc.text(12, cursorY+8, "Ward: ")
  doc.setFontType("bold")
  doc.text(22, cursorY+8, wardName)
  doc.setFontType("normal")
  doc.text(75, cursorY+8, "District: ")
  doc.setFontType("bold")
  doc.text(87, cursorY+8, districtName)
  doc.setFontType("normal")
  doc.text(138, cursorY+8, "Region: ")
  doc.setFontType("bold")
  doc.text(150, cursorY+8, regionName)
  cursorY += 20
  //poulation box//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //map
    doc.addImage(image, 'PNG', 85, cursorY-5, 120, 120)
  doc.setFontSize(14)
  doc.setTextColor(44, 164, 196)
  doc.setFontType("bold");
  doc.text(10, cursorY, `Availability of Health Services`)
  cursorY += 6
  doc.text(10, cursorY, `in ${wardName} ward`)
  cursorY += 10
  doc.setFontSize(20)
  doc.setTextColor(44, 72, 86)
  doc.setFontType("bold");
  const totalPop = population.getIn(['data', 'total']) ? population.getIn(['data', 'total']).toString() : ''
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
  const totalMale = population.getIn(['data', 'totalMale']) ? population.getIn(['data', 'totalMale']).toString() : ''
  const totalFemale = population.getIn(['data', 'totalFemale']) ? population.getIn(['data', 'totalFemale']).toString() : ''
  doc.text(18 - (totalMale.length), cursorY, `${totalMale}`)
  doc.text(36 - (totalFemale.length), cursorY, `${totalFemale}`)
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
  const totalUnder5 = population.getIn(['data', 'totalUnder5']) ? population.getIn(['data', 'totalUnder5']).toString() : ''
  const total5to60 = population.getIn(['data', 'total5to60']) ? population.getIn(['data', 'total5to60']).toString() : ''
  const totalAbove60 = population.getIn(['data', 'totalAbove60']) ? population.getIn(['data', 'totalAbove60']).toString() : ''
  doc.text(18 - (totalUnder5.length), cursorY, `${totalUnder5}`)
  doc.text(36 - (total5to60.length), cursorY, `${total5to60}`)
  doc.text(54 - (totalAbove60.length), cursorY, `${totalAbove60}`)
  
  cursorY += 11
  doc.setFontSize(20)
  doc.setTextColor(44, 72, 86)
  doc.setFontType("bold");
  doc.text(10, cursorY, `${wardFacilities.length}`)
  doc.setFontSize(14)
  doc.text(18, cursorY, ' Total Health Facilities')
  cursorY += 7
  doc.setDrawColor(200, 200, 200)
  doc.line(22, cursorY-2, 22, cursorY+12)
  doc.line(37, cursorY-2, 37, cursorY+12)
  doc.line(52, cursorY-2, 52, cursorY+12)
  doc.line(67, cursorY-2, 67, cursorY+12)
  doc.line(82, cursorY-2, 82, cursorY+12)
  doc.setFontSize(8)
  doc.setTextColor(180, 181, 168)
  doc.text(10, cursorY, `Public`)
  doc.text(25, cursorY, `Private`)
  doc.text(41, cursorY, `Faith`)
  doc.text(40, cursorY+2, `Based`)
  doc.text(53, cursorY, `Parastatal`)
  doc.text(69, cursorY, `Defense`)
  cursorY += 8
  doc.setFontSize(14)
  doc.setTextColor(109, 114, 128)
  doc.text(15 - (totalPublic.toString().length), cursorY, `${totalPublic}`)
  doc.text(29 - (totalPrivate.toString().length), cursorY, `${totalPrivate}`)
  doc.text(44 - (totalFaithBased.toString().length), cursorY, `${totalFaithBased}`)
  doc.text(59 - (totalParastatal.toString().length), cursorY, `${totalParastatal}`)
  doc.text(74 - (totalDefence.toString().length), cursorY, `${totalDefence}`)
  cursorY += 5
  doc.setDrawColor(200, 200, 200)
  doc.line(10, cursorY, 200, cursorY)
  cursorY += 20


  //OPD diagnoses//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  doc.setFontSize(14)
  doc.setTextColor(44, 164, 196)
  doc.text(10, cursorY, `Out-Patient Diseases (OPD) at ${wardName}`)
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
  doc.text(150, cursorY, `${freq} Ward Report`)
  doc.setLineWidth(0.5)
  doc.setDrawColor(200, 200, 200)
  doc.line(10, cursorY+1, 200, cursorY+1)
  cursorY += 12
  //report header
  doc.setFontSize(FONT_HEADER)
  doc.setTextColor(138, 124, 103)
  doc.setFontType("bold")
  doc.text(10, cursorY, wardName)
  doc.text(190 - (currentLabel.length * 3), cursorY, currentLabel)
  cursorY += 5
  doc.setDrawColor(200, 200, 200)
  doc.line(10, cursorY, 200, cursorY)
  cursorY += 20

  //RMNCH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  doc.setFontSize(14)
  doc.setTextColor(44, 164, 196)
  doc.text(10, cursorY, `Reproductive Maternal, Newborn and Child Health at ${wardName}`)
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



  doc.save(`${wardName}.pdf`)
}
