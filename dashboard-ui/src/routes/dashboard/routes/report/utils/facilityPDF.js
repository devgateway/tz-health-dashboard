import jsPDF from 'jspdf'
import {hexToRgb, colorCodeByName} from './colorsUtil'
import {getMonthName, getQuarterLabel, diffPercentage} from '../../../../../api'
import i18n from '../../../../../i18n'

export const generateFacilityPDF = (state, image) => {
  const {info, population, period, diagnoses, RMNCH, mapShape, mapPoints, mapRegion, i18n: {language} } = state
  const facilityName = info.getIn(['name'])
  const facilityType = info.getIn(['type', 'name'])
  const wardName = info.getIn(['ward', 'name'])
  const districtName = info.getIn(['district', 'name'])
  const regionName = info.getIn(['region', 'name'])
  const facilityTypeId = info.getIn(['type', 'dhis2Id'])
  const doc = new jsPDF()
  const TAB_0 = 15
  const TAB_1 = 25
  const TAB_2 = 35
  const TAB_3 = 45
  const FONT_HEADER = 20
  const FONT_PAGE_HEADER = 13
  const FONT_HEADER_SPACE = 10
  let cursorY = 25
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

  //
  //page header
  doc.setFontSize(FONT_PAGE_HEADER)
  doc.setTextColor(19, 88, 151)
  doc.text(10, cursorY, i18n.t('Tanzania Health Data Report'))
  const freq = `${period.get('q') ? i18n.t('Quarterly') : (period.get('m') ? i18n.t('Monthly') : i18n.t('Yearly'))} ${i18n.t('Facility Report')}`
  doc.text(170 - freq.length, cursorY, freq)
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
  doc.text(12, cursorY+8, `${i18n.t('Type')}: `)
  doc.setFontType("bold")
  doc.text(22, cursorY+8, facilityType)
  doc.setFontType("normal")
  doc.text(60, cursorY+8, `${i18n.t('Ward')}: `)
  doc.setFontType("bold")
  doc.text(70, cursorY+8, wardName)
  doc.setFontType("normal")
  doc.text(108, cursorY+8, `${i18n.t('District')}: `)
  doc.setFontType("bold")
  doc.text(120, cursorY+8, districtName)
  doc.setFontType("normal")
  doc.text(154, cursorY+8, `${i18n.t('Region')}: `)
  doc.setFontType("bold")
  doc.text(165, cursorY+8, regionName)
  cursorY += 20
  //poulation box//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //map
    doc.addImage(image, 'PNG', 85, cursorY-5, 120, 120)
  const shapeFeatures = mapShape.toJS()
  let shapeStrokeColor = '#9C8568'
  let regionFeature
  if ((facilityTypeId === "FgLhM6ea9dS" || facilityTypeId === "WK2vj3N9aA0") && mapRegion.getIn(['features']) && mapShape.getIn(['features'])) {
    regionFeature = mapRegion.getIn(['features']).toJS()[0]
    Object.assign(regionFeature.properties, {strokeColor: '#9C8568'})
    shapeStrokeColor = '#6C8EAD'
    shapeFeatures.features.push(regionFeature)
  }

  let totalPopulation = 0
  let totalPopMale = 0
  let totalPopFemale = 0
  if (facilityTypeId === "FgLhM6ea9dS" || facilityTypeId === "WK2vj3N9aA0") {
    if (regionFeature) {
      totalPopulation = regionFeature.properties.POPULATION || '0'
      totalPopMale = regionFeature.properties.POPULATION_MALE || '0'
      totalPopFemale = regionFeature.properties.POPULATION_FEMALE || '0'
    }
  } else {
    if (shapeFeatures.features) {
      totalPopulation = shapeFeatures.features[0].properties.POPULATION || '0'
      totalPopMale = shapeFeatures.features[0].properties.POPULATION_MALE || '0'
      totalPopFemale = shapeFeatures.features[0].properties.POPULATION_FEMALE || '0'
    }
  }
  doc.setFontSize(13)
  doc.setTextColor(44, 164, 196)
  doc.setFontType("bold");
  doc.text(10, cursorY, i18n.t('Availability of Health Services'))
  cursorY += 6
  doc.text(10, cursorY, `${i18n.t('in')} ${regionName} ${i18n.t('Region')}`)
  cursorY += 10
  doc.setFontSize(20)
  doc.setTextColor(44, 72, 86)
  doc.setFontType("bold");
  doc.text(10, cursorY, `${totalPopulation}`)
  doc.setFontSize(13)
  doc.text(15 + (totalPopulation.toString().length*3), cursorY, ` ${i18n.t('Total Population')} `)
  cursorY += 8

  doc.setFontSize(9)
  doc.setTextColor(44, 44, 44)
  doc.setFontType("bold");
  doc.text(10, cursorY, i18n.t('by Gender'))
  cursorY += 7
  doc.setDrawColor(200, 200, 200)
  doc.line(33, cursorY-2, 33, cursorY+12)
  doc.line(57, cursorY-2, 57, cursorY+12)
  doc.setFontSize(8)
  doc.setTextColor(180, 181, 168)
  doc.setFontType("bold");
  doc.text(18, cursorY, i18n.t('Male'))
  doc.text(39, cursorY, i18n.t('Female'))
  cursorY += 8
  doc.setFontSize(13)
  doc.setTextColor(109, 114, 128)
  doc.text(18 - (totalPopMale.toString().length), cursorY, `${totalPopMale}`)
  doc.text(42 - (totalPopFemale.toString().length), cursorY, `${totalPopFemale}`)
  cursorY += 8

  doc.setFontSize(7)
  doc.setTextColor(44, 44, 44)
  doc.text(10, cursorY, i18n.t('Source: census 2012'))
  /*
  doc.setFontSize(9)
  doc.setTextColor(44, 44, 44)
  doc.text(10, cursorY, i18n.t('by Age'))
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
  */
  cursorY += 45
  doc.setDrawColor(200, 200, 200)
  doc.line(10, cursorY, 200, cursorY)
  cursorY += 20

  //OPD diagnoses//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  doc.setFontSize(13)
  doc.setTextColor(44, 164, 196)
  doc.text(10, cursorY, `${i18n.t('Out-Patient Diseases (OPD) at')} ${wardName}`)
  cursorY += 18
  const deseases = diagnoses.get('data')? diagnoses.get('data').sortBy((val)=>-val.get('total')) : [];
  let colsTotals = {
    totalUnder5: 0,
    total5to60: 0,
    totalAbove60: 0,
    totalPrevPeriod: 0,
    total: 0
  }

  doc.setFillColor(244, 242, 236)
  doc.rect(161, cursorY-13, 40, 6, 'F')
  doc.setTextColor(109, 114, 128)
  doc.setFontSize(7)
  doc.text(165, cursorY-9, `+${i18n.t('Increasing')} -${i18n.t('Decreasing')}`)
  
  doc.setFontSize(13)
  doc.setFillColor(244, 242, 236)
  doc.rect(98, cursorY-7, 63, 20 + (diagnoses.get('data').size * 5), 'F')
  
  doc.setTextColor(19, 88, 151)
  doc.text(20, cursorY, i18n.t('Top Ten Diagnoses'))
  cursorY -= 2
  doc.setFontSize(11)
  doc.setTextColor(109, 114, 128)
  doc.text(82 - prevLabel.toString().length, cursorY, `${prevLabel}`)
  doc.text(170, cursorY, `% ${i18n.t('Change')}`)
  doc.setTextColor(156, 133, 104)
  doc.text(127 - currentLabel.toString().length, cursorY, `${currentLabel}`)
  cursorY += 4
  doc.setFontSize(9)
  doc.setFontType('normal')
  doc.setTextColor(109, 114, 128)
  doc.text(80, cursorY, i18n.t('Count'))
  doc.setTextColor(180, 181, 168)
  doc.text(100, cursorY, `${i18n.t('Age')}< 5`)
  doc.text(115, cursorY, `${i18n.t('Age')}5-60`)
  doc.text(130, cursorY, `${i18n.t('Age')}>60`)
  doc.setTextColor(109, 114, 128)
  doc.text(145, cursorY, i18n.t('Count'))
  doc.text(167, cursorY, `${i18n.t('since')} ${prevLabel}`)
  cursorY += 2
  doc.setLineWidth(0.25)
  doc.line(10, cursorY, 200, cursorY)
  
  deseases.forEach((it) => {
    cursorY += 5
    const indicatorLabel = it.getIn(['diagnostic','name'])
    const translation=it.getIn(['diagnostic','translations']).find(e=>e.get('locale')==language)
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
    let label = (translation && translation.get('value')) ? translation.get('value') : indicatorLabel
    if (label.length > 35){
      label = `${label.slice(0, 32)}...`
    }
    doc.text(10, cursorY, `${label}`)
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
  doc.text(50, cursorY, i18n.t('Total'))
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
  doc.text(10, cursorY, i18n.t('Tanzania Health Data Report'))
  doc.text(170 - freq.length, cursorY, freq)
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
  doc.setFontSize(13)
  doc.setTextColor(44, 164, 196)
  doc.text(10, cursorY, `${i18n.t('Reproductive Maternal, Newborn and Child Health at')} ${wardName}`)
  cursorY += 18

  doc.setFillColor(244, 242, 236)
  doc.rect(168, cursorY-13, 35, 6, 'F')
  doc.setTextColor(109, 114, 128)
  doc.setFontSize(7)
  doc.text(170, cursorY-9, `+${i18n.t('Increasing')} -${i18n.t('Decreasing')}`)
  
  doc.setFontSize(13)
  doc.setFillColor(244, 242, 236)
  doc.rect(138, cursorY-7, 30, 20 + (RMNCH.get('data').size * 5), 'F')
  doc.setTextColor(19, 88, 151)
  doc.text(40, cursorY, i18n.t('RMNCH Services'))
  cursorY -= 2
  doc.setFontSize(11)
  doc.setTextColor(109, 114, 128)
  doc.text(122 - prevLabel.toString().length, cursorY, `${prevLabel}`)
  doc.text(172, cursorY, `% ${i18n.t('Change')}`)
  doc.setTextColor(156, 133, 104)
  doc.text(152 - currentLabel.toString().length, cursorY, `${currentLabel}`)
  cursorY += 4
  doc.setFontSize(9)
  doc.setFontType('normal')
  doc.setTextColor(109, 114, 128)
  doc.text(118, cursorY, i18n.t('Count'))
  doc.text(148, cursorY, i18n.t('Count'))
  doc.text(168, cursorY, `${i18n.t('since')} ${prevLabel}`)
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
    let label = (translation && translation.get('value')) ? translation.get('value') : indicatorLabel
    if (label.length > 55){
      label = `${label.slice(0, 52)}...`
    }
    doc.text(10, cursorY, `${label}`)
    const prevValueLabel = it.get("totalPrevPeriod") || 'N/A'
    doc.text(122 - prevValueLabel.toString().length, cursorY, `${prevValueLabel}`)
    const currentValue = it.get('value') || 'N/A'
    doc.text(152 - currentValue.toString().length, cursorY, `${currentValue}`)
    const diffValue = diffPercentage(it.get("totalPrevPeriod"), currentValue)
    doc.text(183 - diffValue.toString().length, cursorY, `${diffValue}`)
  })
  cursorY += 2
  doc.line(10, cursorY, 200, cursorY)
  cursorY += 5
  doc.setTextColor(44, 72, 86)
  doc.text(100, cursorY, i18n.t('Total'))
  totalPrevValueLabel = totalPrevious || 'N/A'
  doc.text(122 - totalPrevValueLabel.toString().length, cursorY, `${totalPrevValueLabel}`)
  const totalValueLabel = totalCurrent || 'N/A'
  doc.text(152 - totalValueLabel.toString().length, cursorY, `${totalValueLabel}`)
  diffTotalValue = diffPercentage(totalPrevious, totalCurrent)
  doc.text(183 - diffTotalValue.toString().length, cursorY, `${diffTotalValue}`)
  cursorY += 2
  doc.setLineWidth(0.5)
  doc.line(10, cursorY, 200, cursorY)



  doc.save(`${facilityName}.pdf`)
}
