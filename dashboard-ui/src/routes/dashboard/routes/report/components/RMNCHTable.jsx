import React from 'react'
import {translate, Trans} from "react-i18next";
import {getMonthName, getQuarterLabel, diffPercentage, getDownloadURI} from '../../../../../api'
import {MonthLabel, QuarterLabel} from './labels'
import RMNCHBarchart from '../components/RMNCHBarchart'

class RMNCHTable extends React.Component {

  setRMNCHView(view){
    const {onSetRMNCHView} = this.props
    onSetRMNCHView(view)
  }

  render() {
    const {id,gid, RMNCH, type, period, facilityName, i18n: {language}, RMNCHView, onSetRMNCHView} = this.props

    let data=[]
    if (RMNCH && RMNCH.get('loading') == true) {
      return <div>Loading</div>
    } else if (RMNCH && (data=RMNCH.get('data'))){
      const year = parseInt(period.get('y'))
      const quarter = parseInt(period.get('q'))
      const month = parseInt(period.get('m'))
      let current,
        currentLabel,
        prev,
        prevLabel;
      if (month) {
        current = month
        prev = (month == 1) ? 12 : month - 1
        currentLabel = (<MonthLabel month={getMonthName(month)} year={year}/>)
        const prevYear = (current == 1) ? year - 1 : year
        prevLabel = (<MonthLabel month={getMonthName(prev)} year={prevYear}/>)
      } else if (quarter) {
        current = quarter
        prev = (quarter == 1) ? 4 : quarter - 1
        const prevYear = (current == 1) ? year - 1 : year
        currentLabel = (<QuarterLabel start={getQuarterLabel(current).start} end={getQuarterLabel(current).end} year={year}/>)
        prevLabel = (<QuarterLabel start={getQuarterLabel(prev).start} end={getQuarterLabel(prev).end} year={prevYear}/>)
      } else {
        current = year
        prev = year - 1
        currentLabel = current;
        prevLabel = prev;
      }
      const cares = []
      let totalPrevious = 0
      let totalCurrent = 0

      return (
      <div className="RMNCH-box">
        <div className="sub-title"><Trans>Reproductive Maternal, Newborn and Child Health at</Trans> {facilityName}</div>
        <div className="download">
          <a className="csv" href={getDownloadURI(type,'rmnch','csv', id, period.toJS(), language)} target="_blank"></a>
          <a className="json" href={getDownloadURI(type,'rmnch','json', id, period.toJS(), language)} target="_blank"></a>
          <div className="separator"/>
          <div className={RMNCHView === 'table' ? 'table-selected' : 'table'} onClick={e => this.setRMNCHView('table')}></div>
          <div className={RMNCHView === 'barChart' ? 'barChart-selected' : 'barChart'} onClick={e => this.setRMNCHView('barChart')}></div>
        </div>
        {RMNCHView === 'barChart' && <RMNCHBarchart period={period} id={id} facilityName={facilityName} RMNCH={this.props.RMNCH}/>}
        {RMNCHView === 'table' && 
          <div className="RMNCH-table">
            <div className="value-legend"><b>%<Trans>Change</Trans><Trans>Legend</Trans></b> +<Trans>Increasing</Trans>/ -<Trans>Decreasing</Trans></div>
              <table className="">
                <tbody>
                  <tr>
                    <th className="diagnosis-header" rowSpan="2"><Trans>RMNCH Services</Trans></th>
                    <th className="previous-period-header">{prevLabel} </th>
                    <th className="current-period-header"> {currentLabel}</th>
                    <th className="previous-period-header">% <Trans>Change</Trans></th>
                  </tr>
                  <tr>
                    <td className="previous-period-sub-header"><Trans>Count</Trans></td>
                    <td className="current-period-sub-header"><Trans>Count</Trans></td>
                    <td className="previous-period-sub-header"><Trans>since</Trans> {prevLabel}</td>
                  </tr>
                  {data.map(it => {
                    const indicatorLabel = it.getIn(['indicator','name'])
                    const translation=it.getIn(['indicator', 'translations']).find(e=>e.get('locale') == language);
                    totalPrevious += it.get('totalPrevPeriod')
                    totalCurrent += it.get('value')
                    return (
                      <tr>
                        <td className="desease-name">{(translation && translation.get('value'))?translation.get('value') :indicatorLabel}</td>
                        <td className="previous-value">{it.get('totalPrevPeriod')}</td>
                        <td className="current-value">{it.get('value')}</td>
                        <td className="previous-value">{diffPercentage(it.get('totalPrevPeriod'),it.get('value'))}</td>
                      </tr>
                    )
                  })}
                  <tr className="total-values">
                    <td className="desease-name"><Trans>Total</Trans></td>
                    <td className="previous-value">{totalPrevious}</td>
                    <td className="current-value">{totalCurrent}</td>
                    <td className="previous-value">{diffPercentage(totalPrevious,totalCurrent)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </div>
      )
    } else {
      return null;
    }
  }
}

export default translate("translations")(RMNCHTable)
