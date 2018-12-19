import React from 'react'
import PropTypes from "prop-types"
import {translate, Trans} from "react-i18next"
import BarChart from '../../../../../components/stackedGroupedColumnChart'
import {getPeriodLabels} from '../utils/labelsUtil'
import i18n from '../../../../../i18n'

class RMNCHBarchart extends React.Component {

  render() {
    const {period, RMNCH, i18n: {language}} = this.props
    const RMNCHData = RMNCH.get('data').toJS()
    const RMNCHCategories = RMNCHData.map(d => { 
      const tr = d.indicator.translations.find(e => e.locale === language)
      if (tr && tr.value){
        return tr.value
      } else {
        return d.indicator.name
      } 
    })
    const RMNCHSeries = [{
        color: '#9C9487',
        name: getPeriodLabels(period).prevLabel,
        data: RMNCHData.map(d => d.totalPrevPeriod),
        stack: getPeriodLabels(period).prevLabel
    }, {
        color: '#776D5A',
        name: getPeriodLabels(period).currentLabel,
        data: RMNCHData.map(d => d.value !== -1 ? d.value : 0),
        stack: getPeriodLabels(period).currentLabel
    }]
    return (
      <div className="">
        <BarChart categories={RMNCHCategories} series={RMNCHSeries} chartId="RMNCHbc"/>
      </div>
    )
  }
}

export default translate("translations")(RMNCHBarchart)
