import React from 'react'
import PropTypes from "prop-types"
import {translate, Trans} from "react-i18next"
import BarChart from '../../../../../components/stackedGroupedColumnChart'
import {getPeriodLabels} from '../utils/labelsUtil'
import i18n from '../../../../../i18n'

class OPDBarchart extends React.Component {

  render() {
    const {period, diagnoses, i18n: {language}} = this.props
    const OPDData = diagnoses.get('data').toJS()
    const OPDCategories = OPDData.map(d => { 
      const tr = d.diagnostic.translations.find(e => e.locale === language)
      if (tr && tr.value){
        return tr.value
      } else {
        return d.diagnostic.name
      } 
    })
    const OPDSeries = [{
        name: 'Total Prev',
        data: OPDData.map(d => d.totalPrevPeriod),
        stack: getPeriodLabels(period).prevLabel
    }, {
        name: `${i18n.t('Age')}<5`,
        data: OPDData.map(d => d.ranges.totalUnder5 !== -1 ? d.ranges.totalUnder5 : 0),
        stack: getPeriodLabels(period).currentLabel
    }, {
        name: `${i18n.t('Age')}5-60`,
        data: OPDData.map(d => d.ranges.total5to60 !== -1 ? d.ranges.total5to60 : 0),
        stack: getPeriodLabels(period).currentLabel
    }, {
        name: `${i18n.t('Age')}>60`,
        data: OPDData.map(d => d.ranges.totalAbove60 !== -1 ? d.ranges.totalAbove60 : 0),
        stack: getPeriodLabels(period).currentLabel
    }]
    return (
      <div className="">
        <BarChart categories={OPDCategories} series={OPDSeries} chartId="OPDbc"/>
      </div>
    )
  }
}

export default translate("translations")(OPDBarchart)
