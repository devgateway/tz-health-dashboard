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
        color: '#9C9487',
        name: `${i18n.t('Age')}<5 (${getPeriodLabels(period).prevLabel})`,
        data: OPDData.map(d => d.ranges.totalUnder5Prev !== -1 ? d.ranges.totalUnder5Prev : 0),
        stack: getPeriodLabels(period).prevLabel
    }, {
        color: '#BDACAB',
        name: `${i18n.t('Age')}5-60 (${getPeriodLabels(period).prevLabel})`,
        data: OPDData.map(d => d.ranges.total5to60Prev !== -1 ? d.ranges.total5to60Prev : 0),
        stack: getPeriodLabels(period).prevLabel
    }, {
        color: '#A09CB0',
        name: `${i18n.t('Age')}>60 (${getPeriodLabels(period).prevLabel})`,
        data: OPDData.map(d => d.ranges.totalAbove60Prev !== -1 ? d.ranges.totalAbove60Prev : 0),
        stack: getPeriodLabels(period).prevLabel
    }, {
        color: '#776D5A',
        name: `${i18n.t('Age')}<5 (${getPeriodLabels(period).currentLabel})`,
        data: OPDData.map(d => d.ranges.totalUnder5 !== -1 ? d.ranges.totalUnder5 : 0),
        stack: getPeriodLabels(period).currentLabel
    }, {
        color: '#987D7C',
        name: `${i18n.t('Age')}5-60 (${getPeriodLabels(period).currentLabel})`,
        data: OPDData.map(d => d.ranges.total5to60 !== -1 ? d.ranges.total5to60 : 0),
        stack: getPeriodLabels(period).currentLabel
    }, {
        color: '#928EA0',
        name: `${i18n.t('Age')}>60 (${getPeriodLabels(period).currentLabel})`,
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
