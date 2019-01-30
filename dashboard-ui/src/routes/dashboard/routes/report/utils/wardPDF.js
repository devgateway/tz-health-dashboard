import jsPDF from 'jspdf'
import {hexToRgb, colorCodeByName} from './colorsUtil'
import {getMonthName, getQuarterLabel, diffPercentage} from '../../../../../api'
import i18n from '../../../../../i18n'
import {stringWrap} from './printUtil'

export const generateWardPDF = (state, mapImage, opdImage, rmnchImage) => {
  const {conf, params: {id}, mapShape, mapPoints, info, population, period, diagnoses, RMNCH, typeMapping, i18n: {language}} = state
  const facilitiesFeatures = []
  const wardFacilities = []
  if (mapPoints) {
    mapPoints.forEach(f => {
      facilitiesFeatures.push({properties: {ID: f.get('id'), NAME: f.get('name'), fillColor: f.getIn(['ward', 'gid']) == id ? '#980707' : null, strokeColor: '#57595d'}, geometry: f.get('point').toJS()})
      if (f.getIn(['ward', 'gid']) == id) {
        if(f.get('ownership')==null){
          console.log("facility without ownership"+f.get('code'));
        }

        wardFacilities.push(f.toJS())
      }
    })
  }

  //totals by ownership types
  const totalPrivate = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'UE4MHrqMzfd').length
  const totalFaithBased = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'rj0MuRMJYCj').length
  const totalPublic = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'm16TP0k7LVw').length
  const totalParastatal = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'G6Mg194YpDy').length
  const totalDefence = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'iTwLKcbi6BX').length
  const totalUndefined=  wardFacilities.filter(f => !f.ownership ).length
  
  //totals by facility types
  const hospitalDHIS2ids = typeMapping.filter(f => f.maskType === 'Hospital').map(f => f.dhis2Id)
  const totalHospital = wardFacilities.filter(f => f.detailedType && hospitalDHIS2ids.indexOf(f.detailedType.dhis2Id) !== -1).length
  const healthCenterDHIS2ids = typeMapping.filter(f => f.maskType === 'Health Center').map(f => f.dhis2Id)
  const totalHealthCenter = wardFacilities.filter(f => f.detailedType && healthCenterDHIS2ids.indexOf(f.detailedType.dhis2Id) !== -1).length
  const clinicDHIS2ids = typeMapping.filter(f => f.maskType === 'Clinic').map(f => f.dhis2Id)
  const totalClinic = wardFacilities.filter(f => f.detailedType && clinicDHIS2ids.indexOf(f.detailedType.dhis2Id) !== -1).length
  const dispensaryDHIS2ids = typeMapping.filter(f => f.maskType === 'Dispensary').map(f => f.dhis2Id)
  const totalDispensary = wardFacilities.filter(f => f.detailedType && dispensaryDHIS2ids.indexOf(f.detailedType.dhis2Id) !== -1).length
  const totalTypeUndefined = wardFacilities.filter(f => !f.detailedType ).length

  const pointFeatures = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
  const wardName = info.getIn(['name'])
  const districtName = info.getIn(['district', 'name'])
  const regionName = info.getIn(['region', 'name'])
  const shapeFeatures = mapShape.toJS()

  let totalPopulation = 0
  let totalPopMale = 0
  let totalPopFemale = 0
  if (shapeFeatures.features) {
    totalPopulation = shapeFeatures.features[0].properties.POPULATION || 0
    totalPopMale = shapeFeatures.features[0].properties.POPULATION_MALE || 0
    totalPopFemale = shapeFeatures.features[0].properties.POPULATION_FEMALE || 0
  }


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
  const freq = `${period.get('q') ? i18n.t('Quarterly') : (period.get('m') ? i18n.t('Monthly') : i18n.t('Yearly'))} ${i18n.t('Ward Report')}`
  doc.text(170 - freq.length, cursorY, freq)
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
  doc.text(12, cursorY+8, `${i18n.t('Ward')}: `)
  doc.setFontType("bold")
  doc.text(22, cursorY+8, wardName)
  doc.setFontType("normal")
  doc.text(75, cursorY+8, `${i18n.t('District')}: `)
  doc.setFontType("bold")
  doc.text(87, cursorY+8, districtName)
  doc.setFontType("normal")
  doc.text(138, cursorY+8, `${i18n.t('Region')}: `)
  doc.setFontType("bold")
  doc.text(150, cursorY+8, regionName)
  cursorY += 20
  //poulation box//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //map
    doc.addImage(mapImage, 'PNG', 105, cursorY-5, 95, 80)
  doc.setFontSize(11)
  doc.setTextColor(44, 164, 196)
  doc.setFontType("bold");
  doc.text(10, cursorY, i18n.t('Availability of Health Services'))
  cursorY += 10

  doc.setFontSize(18)
  doc.setTextColor(44, 72, 86)
  doc.setFontType("bold");
  doc.text(10, cursorY, `${totalPopulation}`)
  doc.setFontSize(11)
  doc.text(15 + (totalPopulation.toString().length*3), cursorY, ` ${i18n.t('Total Population')} ${i18n.t('in')} ${wardName} ${i18n.t('ward')}`)
  cursorY += 8
  doc.setFontSize(9)
  doc.setTextColor(44, 44, 44)
  doc.setFontType("bold");
  doc.text(10, cursorY, i18n.t('by Gender'))
  cursorY += 6
  doc.setDrawColor(200, 200, 200)
  doc.line(33, cursorY-2, 33, cursorY+12)
  doc.line(57, cursorY-2, 57, cursorY+12)
  doc.setFontSize(8)
  doc.setTextColor(180, 181, 168)
  doc.setFontType("bold");
  doc.text(10, cursorY, i18n.t('Male'))
  doc.text(35, cursorY, i18n.t('Female'))
  cursorY += 8
  doc.setFontSize(13)
  doc.setTextColor(109, 114, 128)
  doc.text(10, cursorY, `${totalPopMale}`)
  doc.text(35, cursorY, `${totalPopFemale}`)
  cursorY += 6
  doc.setFontSize(7)
  doc.setTextColor(44, 44, 44)
  doc.text(10, cursorY,`${i18n.t('Source')}: ${i18n.t('census 2012')}`)
  cursorY += 10

  doc.setFontSize(18)
  doc.setTextColor(44, 72, 86)
  doc.setFontType("bold");
  doc.text(10, cursorY, `${wardFacilities.length}`)
  doc.setFontSize(11)
  doc.text(15 + (wardFacilities.length.toString().length*3), cursorY, ` ${i18n.t('Total Health Facilities')} ${i18n.t('in')} ${wardName} ${i18n.t('ward')}`)
  cursorY += 6
  doc.setDrawColor(200, 200, 200)
  doc.line(27, cursorY-2, 27, cursorY+9)
  doc.line(45, cursorY-2, 45, cursorY+9)
  doc.line(63, cursorY-2, 63, cursorY+9)
  doc.line(81, cursorY-2, 81, cursorY+9)
  doc.line(99, cursorY-2, 99, cursorY+9)
  if (totalUndefined > 0) {
    doc.line(117, cursorY-2, 117, cursorY+9)
  }
  doc.setFontSize(8)
  doc.setTextColor(180, 181, 168)
  doc.setFontType("bold");
  doc.text(10, cursorY, i18n.t('Public'))
  doc.text(29, cursorY, i18n.t('Private'))
  doc.text(47, cursorY, stringWrap(i18n.t('Faith Based'), 10))
  doc.text(65, cursorY, stringWrap(i18n.t('Parastatal'), 10))
  doc.text(83, cursorY, i18n.t('Defense'))
  if (totalUndefined > 0) {
    doc.text(101, cursorY, i18n.t('Undefined'))
  }
  cursorY += 8
  doc.setFontSize(13)
  doc.setTextColor(109, 114, 128)
  doc.text(10, cursorY, totalPublic.toString())
  doc.text(29, cursorY, totalPrivate.toString())
  doc.text(47, cursorY, totalFaithBased.toString())
  doc.text(65, cursorY, totalParastatal.toString())
  doc.text(83, cursorY, totalDefence.toString())
  if (totalUndefined > 0) {
    doc.text(101, cursorY, totalUndefined.toString())
  }
  cursorY += 8

  doc.setDrawColor(200, 200, 200)
  doc.line(27, cursorY-2, 27, cursorY+9)
  doc.line(45, cursorY-2, 45, cursorY+9)
  doc.line(63, cursorY-2, 63, cursorY+9)
  doc.line(81, cursorY-2, 81, cursorY+9)
  if (totalTypeUndefined > 0) {
    doc.line(99, cursorY-2, 99, cursorY+9)
  }
  doc.setFontSize(8)
  doc.setTextColor(180, 181, 168)
  doc.setFontType("bold");
  doc.text(10, cursorY, i18n.t('Hospital'))
  doc.text(29, cursorY, stringWrap(i18n.t('Health Center'), 10))
  doc.text(47, cursorY, i18n.t('Clinic'))
  doc.text(65, cursorY, i18n.t('Dispensary'))
  if (totalTypeUndefined > 0) {
    doc.text(83, cursorY, i18n.t('Undefined'))
  }
  cursorY += 8
  doc.setFontSize(13)
  doc.setTextColor(109, 114, 128)
  doc.text(10, cursorY, totalHospital.toString())
  doc.text(29, cursorY, totalHealthCenter.toString())
  doc.text(47, cursorY, totalClinic.toString())
  doc.text(65, cursorY, totalDispensary.toString())
  if (totalTypeUndefined > 0) {
    doc.text(83, cursorY, totalTypeUndefined.toString())
  }

  doc.setDrawColor(200, 200, 200)
  doc.line(10, 150, 200, 150)
  cursorY += 25
  
  //OPD diagnoses//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  doc.setFontSize(11)
  doc.setTextColor(44, 164, 196)
  doc.text(10, cursorY, `${i18n.t('Out-Patient Diseases (OPD) at')} ${wardName} ${i18n.t('ward')}`)
  cursorY += 18

  if (opdImage) {
    doc.addImage(opdImage, 'PNG', 10, cursorY-5, 195, 80)
  } else {
    const deseases = diagnoses.get('data')? diagnoses.get('data').sortBy((val)=>-val.get('total')) : [];
    let colsTotals = {
      totalUnder5: 0,
      total5to60: 0,
      totalAbove60: 0,
      totalUnder5Prev: 0,
      total5to60Prev: 0,
      totalAbove60Prev: 0,
      totalPrevPeriod: 0,
      total: 0
    }

    doc.setTextColor(109, 114, 128)
    doc.setFontSize(7)
    doc.text(10, cursorY-9, `% ${i18n.t('Change')} ${i18n.t('Legend')}:  +${i18n.t('Increasing')} / -${i18n.t('Decreasing')}`)

    doc.setFontSize(10)
    doc.setFillColor(244, 242, 236)
    doc.rect(125, cursorY-7, 51, 21 + (diagnoses.get('data').size * 6), 'F')

    doc.setTextColor(19, 88, 151)
    doc.text(20, cursorY, i18n.t('Top Ten Diagnoses'))
    cursorY -= 2
    doc.setFontSize(10)
    doc.setTextColor(156, 133, 104)
    doc.text(100 - prevLabel.toString().length, cursorY, `${prevLabel}`)
    doc.text(180, cursorY, `% ${i18n.t('Change')}`)
    doc.text(150 - currentLabel.toString().length, cursorY, `${currentLabel}`)
    cursorY += 4
    doc.setFontSize(8)
    doc.setFontType('normal')
    doc.text(75, cursorY, `${i18n.t('Age')}< 5`)
    doc.text(88, cursorY, `${i18n.t('Age')}5-60`)
    doc.text(101, cursorY, `${i18n.t('Age')}>60`)
    doc.text(114, cursorY, i18n.t('Count'))
    doc.text(127, cursorY, `${i18n.t('Age')}< 5`)
    doc.text(140, cursorY, `${i18n.t('Age')}5-60`)
    doc.text(153, cursorY, `${i18n.t('Age')}>60`)
    doc.text(166, cursorY, i18n.t('Count'))
    const sinceLabel = `${i18n.t('since')} ${prevLabel}`
    doc.text(193 - sinceLabel.length, cursorY, sinceLabel)
    cursorY += 2
    doc.setLineWidth(0.25)
    doc.line(10, cursorY, 200, cursorY)

    deseases.forEach((it, idx) => {
      cursorY += 6
      if (idx % 2 !== 0) {
        doc.setFillColor(244, 242, 236)
        doc.rect(10, cursorY-4, 190, 6, 'F')
      }
      const lbl = it.getIn(['diagnostic', 'name'])
      const translation=it.getIn(['diagnostic', 'translations']).find(e=>e.get('locale') == language)
      const totalUnder5 = it.getIn(['ranges', 'totalUnder5'])
      const total5to60 = it.getIn(['ranges', 'total5to60'])
      const totalAbove60 = it.getIn(['ranges', 'totalAbove60'])
      const totalUnder5Prev = it.getIn(['ranges', 'totalUnder5Prev'])
      const total5to60Prev = it.getIn(['ranges', 'total5to60Prev'])
      const totalAbove60Prev = it.getIn(['ranges', 'totalAbove60Prev'])
      const totalPrevPeriod = it.getIn(['ranges', 'totalPrev'])
      const total = it.get("total")

      if (totalUnder5 != -1) {
        colsTotals['totalUnder5'] += totalUnder5
      }
      if (total5to60 != -1) {
        colsTotals['total5to60'] += total5to60
      }
      if (totalAbove60 != -1) {
        colsTotals['totalAbove60'] += totalAbove60
      }
      if (totalUnder5Prev != -1) {
        colsTotals['totalUnder5Prev'] += totalUnder5Prev
      }
      if (total5to60Prev != -1) {
        colsTotals['total5to60Prev'] += total5to60Prev
      }
      if (totalAbove60Prev != -1) {
        colsTotals['totalAbove60Prev'] += totalAbove60Prev
      }
      if (totalPrevPeriod != -1) {
        colsTotals['totalPrevPeriodHasValue']=true
        colsTotals['totalPrevPeriod'] += totalPrevPeriod
      }
      colsTotals['total'] += total
      const diffPercent = diffPercentage(totalPrevPeriod, total)
      doc.setFontSize(9)
      doc.setTextColor(91, 91, 91)
      doc.setFontType("bold");
      let label = (translation && translation.get('value')) ? translation.get('value') : lbl
      if (label.length > 40){
        label = `${label.slice(0, 38)}...`
      }
      doc.text(10, cursorY, `${label}`)
      doc.text(80 - totalUnder5Prev.toString().length, cursorY, totalUnder5Prev == -1 ? 'N/A' : totalUnder5Prev.toString())
      doc.text(93 - total5to60Prev.toString().length, cursorY, total5to60Prev == -1 ? 'N/A' : total5to60Prev.toString())
      doc.text(106 - totalAbove60.toString().length, cursorY, totalAbove60 == -1 ? 'N/A' : totalAbove60.toString())
      doc.setTextColor(10, 10, 10)
      doc.text(119 - totalPrevPeriod.toString().length, cursorY, totalPrevPeriod == -1 ? 'N/A' : totalPrevPeriod.toString())
      doc.setTextColor(91, 91, 91)
      doc.text(132 - totalUnder5.toString().length, cursorY, totalUnder5 == -1 ? 'N/A' : totalUnder5.toString())
      doc.text(145 - total5to60.toString().length, cursorY, total5to60 == -1 ? 'N/A' : total5to60.toString())
      doc.text(158 - totalUnder5Prev.toString().length, cursorY, totalUnder5Prev == -1 ? 'N/A' : totalUnder5Prev.toString())
      doc.setTextColor(10, 10, 10)
      doc.text(171 - total.toString().length, cursorY, total == -1 ? 'N/A' : total.toString())
      const diffPercentStr = totalPrevPeriod == -1 || total == -1 ? 'N/A' : `${diffPercent > 0 ? '+' : ''}${diffPercent}%`
      doc.text(188 - diffPercentStr.length, cursorY, diffPercentStr)
    })
    cursorY += 2
    doc.line(10, cursorY, 200, cursorY)
    cursorY += 6
    doc.setTextColor(91, 91, 91)
    doc.text(60, cursorY, i18n.t('Total'))
    doc.text(80 - colsTotals['totalUnder5Prev'].toString().length, cursorY, colsTotals['totalUnder5Prev'].toString())
    doc.text(93 - colsTotals['total5to60Prev'].toString().length, cursorY, colsTotals['total5to60Prev'].toString())
    doc.text(106 - colsTotals['totalAbove60Prev'].toString().length, cursorY, colsTotals['totalAbove60Prev'].toString())
    doc.setTextColor(10, 10, 10)
    doc.text(119 - colsTotals['totalPrevPeriod'].toString().length, cursorY, colsTotals['totalPrevPeriod'].toString())
    doc.setTextColor(91, 91, 91)
    doc.text(132 - colsTotals['totalUnder5'].toString().length, cursorY, colsTotals['totalUnder5'].toString())
    doc.text(145 - colsTotals['total5to60'].toString().length, cursorY, colsTotals['total5to60'].toString())
    doc.text(158 - colsTotals['totalAbove60'].toString().length, cursorY, colsTotals['totalAbove60'].toString())
    doc.setTextColor(10, 10, 10)
    doc.text(171 - colsTotals['total'].toString().length, cursorY, colsTotals['total'].toString())
    const totalDiff = diffPercentage(colsTotals['totalPrevPeriod'], colsTotals['total'])
    const totalDiffStr = `${totalDiff > 0 ? '+' : ''} ${totalDiff}%`
    doc.text(188 - totalDiffStr.length, cursorY, totalDiffStr)
    cursorY += 2
    doc.setLineWidth(0.5)
    doc.line(10, cursorY, 200, cursorY)
  }


  doc.addPage()
  cursorY = 25
  //page header
  doc.setFontSize(FONT_PAGE_HEADER)
  doc.setTextColor(19, 88, 151)
  doc.setFontType('normal')
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
  doc.text(10, cursorY, wardName)
  doc.text(190 - (currentLabel.length * 3), cursorY, currentLabel)
  cursorY += 20
 
  
  //RMNCH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  doc.setFontSize(11)
  doc.setTextColor(44, 164, 196)
  doc.text(10, cursorY, `${i18n.t('Out-Patient Diseases (OPD) at')} ${wardName} ${i18n.t('ward')}`)
  cursorY += 18

  if (rmnchImage) {
    doc.addImage(rmnchImage, 'PNG', 10, cursorY-5, 195, 80)
  } else {
    doc.setTextColor(109, 114, 128)
    doc.setFontSize(7)
    doc.text(10, cursorY-9, `% ${i18n.t('Change')} ${i18n.t('Legend')}:  +${i18n.t('Increasing')} / -${i18n.t('Decreasing')}`)

    doc.setFontSize(10)
    doc.setFillColor(244, 242, 236)
    doc.rect(153, cursorY-7, 23, 21 + (RMNCH.get('data').size * 6), 'F')
    doc.setTextColor(19, 88, 151)
    doc.text(40, cursorY, i18n.t('RMNCH Services'))
    cursorY -= 2
    doc.setTextColor(156, 133, 104)
    doc.text(142 - prevLabel.toString().length, cursorY, `${prevLabel}`)
    doc.text(165 - currentLabel.toString().length, cursorY, `${currentLabel}`)
    doc.text(180, cursorY, `% ${i18n.t('Change')}`)
    cursorY += 4
    doc.setFontSize(8)
    doc.setFontType('normal')
    doc.text(138, cursorY, i18n.t('Count'))
    doc.text(161, cursorY, i18n.t('Count'))
    const sinceLbl = `${i18n.t('since')} ${prevLabel}`
    doc.text(193 - sinceLbl.length, cursorY, sinceLbl)
    cursorY += 2
    doc.setLineWidth(0.25)
    doc.line(10, cursorY, 200, cursorY)
    let totalPrevious = 0
    let totalCurrent = 0

    RMNCH.get('data').forEach((it, idx) => {
      cursorY += 6
      if (idx % 2 !== 0) {
        doc.setFillColor(244, 242, 236)
        doc.rect(10, cursorY-4, 190, 6, 'F')
      }
      const indicatorLabel = it.getIn(['indicator','name'])
      const translation=it.getIn(['indicator','translations']).find(e=>e.get('locale')==language);
      totalPrevious += it.get('totalPrevPeriod')
      totalCurrent += it.get('value')
      doc.setFontSize(9)
      doc.setTextColor(91, 91, 91)
      doc.setFontType("bold");
      let label = (translation && translation.get('value')) ? translation.get('value') : indicatorLabel
      if (label.length > 85){
        label = `${label.slice(0, 82)}...`
      }
      doc.text(10, cursorY, `${label}`)
      doc.setTextColor(10, 10, 10)
      const prevValueLabel = it.get("totalPrevPeriod") || 'N/A'
      doc.text(142 - prevValueLabel.toString().length, cursorY, `${prevValueLabel}`)
      const currentValue = it.get('value') || 'N/A'
      doc.text(165 - currentValue.toString().length, cursorY, `${currentValue}`)
      const diffValue = diffPercentage(it.get("totalPrevPeriod"), currentValue)
      const diffPercentStr = it.get("totalPrevPeriod") == -1 || currentValue == -1 ? 'N/A' : `${diffValue > 0 ? '+' : ''}${diffValue}%`
      doc.text(190 - diffPercentStr.length, cursorY, diffPercentStr)
    })
    cursorY += 2
    doc.line(10, cursorY, 200, cursorY)
    cursorY += 6
    doc.setTextColor(91, 91, 91)
    doc.text(100, cursorY, i18n.t('Total'))
    doc.setTextColor(10, 10, 10)
    const totalPrevValueLabel = totalPrevious || 'N/A'
    doc.text(142 - totalPrevValueLabel.toString().length, cursorY, `${totalPrevValueLabel}`)
    const totalValueLabel = totalCurrent || 'N/A'
    doc.text(165 - totalValueLabel.toString().length, cursorY, `${totalValueLabel}`)
    const diffTotalValue = diffPercentage(totalPrevious, totalCurrent)
    const diffTotalStr = `${diffTotalValue > 0 ? '+' : ''} ${diffTotalValue}%`
    doc.text(190 - diffTotalStr.length, cursorY, diffTotalStr)
    cursorY += 2
    doc.setLineWidth(0.5)
    doc.line(10, cursorY, 200, cursorY)  
  }

  doc.save(`${wardName}.pdf`)
}
