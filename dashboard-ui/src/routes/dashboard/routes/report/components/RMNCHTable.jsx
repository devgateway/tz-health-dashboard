import React from 'react'
import {translate, Trans} from "react-i18next";
import {getMonthName, getQuarterLabel,diffPercentage} from '../../../../../api'
import {MonthLabel, QuarterLabel} from './labels'

class RMNCHTable extends React.Component {

  render() {


    const {facilityName, i18n: {
        language
      }} = this.props
    const {RMNCH, period} = this.props
    let data=[]

    if (RMNCH && RMNCH.get('loading') == true) {
      return <div>Loading</div>
    } else if(RMNCH && (data=RMNCH.get('data'))){

      const year = parseInt(period.get('y'))
        const quarter = parseInt(period.get('q'))
          const month = parseInt(period.get('m'))

            let current,
              currentLabel,
              prev,
              prevLabel;

            if (month) {
              current = month
              prev = (month == 1)
                ? 12
                : month - 1
              currentLabel = (<MonthLabel month={getMonthName(month)} year={year}/>)
              const prevYear = (current == 1)
                ? year - 1
                : year
              prevLabel = (<MonthLabel month={getMonthName(prev)} year={prevYear}/>)

            } else if (quarter) {
              current = quarter
              prev = (quarter == 1)
                ? 4
                : quarter - 1
              const prevYear = (current == 1)
                ? year - 1
                : year
              currentLabel = (<QuarterLabel start={getQuarterLabel(current).start} end={getQuarterLabel(current).end} year={year}/>)
              prevLabel = (<QuarterLabel start={getQuarterLabel(prev).start} end={getQuarterLabel(prev).end} year={prevYear}/>)
            } else {
              current = year
              prev = year - 1
              currentLabel = current;
              prevLabel = prev;
            }

            let lan = 'en'
            if (language == 'en')
              lan = 'english'

            if (language == 'sw')
              lan = 'swahili'

            const cares = []
            let totalPrevious = 0
            let totalCurrent = 0
            return (<div className="RMNCH-table">
              <table className="">
                <tbody>
                  <tr>
                    <th className="diagnosis-header" rowSpan="2">RMNCH Services</th>
                    <th className="previous-period-header">{prevLabel} </th>
                    <th className="current-period-header"> {currentLabel}</th>
                    <th className="previous-period-header">% Change</th>
                  </tr>
                  <tr>
                    <td className="previous-period-sub-header">Count</td>
                    <td className="current-period-sub-header">Count</td>
                    <td className="previous-period-sub-header">since {prevLabel}</td>
                  </tr>
                  {
                    data.map(it => {
                      debugger;
                      totalPrevious += it.get('totalPrevPeriod')
                      totalCurrent += it.get('value')
                      return (<tr>
                        <td className="desease-name">{it.getIn(['indicator','name'])}</td>
                        <td className="previous-value">{it.get('totalPrevPeriod')}</td>
                        <td className="current-value">{it.get('value')}</td>
                        <td className="previous-value">{diffPercentage(it.get('totalPrevPeriod'),it.get('value'))}</td>
                      </tr>)
                    })
                  }
                  <tr className="total-values">
                    <td className="desease-name">Total</td>
                    <td className="previous-value">{totalPrevious}</td>
                    <td className="current-value">{totalCurrent}</td>
                    <td className="previous-value">{diffPercentage(totalPrevious,totalCurrent)}</td>
                  </tr>
                </tbody>
              </table>
            </div>)
          }else{
            return null;
          }
        }
      }

      export default translate("translations")(RMNCHTable)
