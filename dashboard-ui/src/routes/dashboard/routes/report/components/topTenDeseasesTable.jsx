import React from 'react'
import {translate, Trans} from "react-i18next";
import {getMonthName,getQuarterLabel, diffPercentage, parsePeriod, getDownloadURI} from '../../../../../api'
import {MonthLabel, QuarterLabel} from './labels'
import OPDBarchart from '../components/OPDBarchart'

class TopTenDeseases extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentExpanded: true, previousExpanded: false};
  }

  onToggleExpand(column){
    if (column === 'current') {
      this.setState({currentExpanded: !this.state.currentExpanded})
    } else {
      this.setState({previousExpanded: !this.state.previousExpanded})
    }
  }

  setOPDView(view){
    const {onSetOPDView} = this.props
    onSetOPDView(view)
  }

  render() {
    const {id,type,period,facilityName, i18n: {language}, OPDView} = this.props
    const {currentExpanded, previousExpanded} = this.state
    const year = parseInt(period.get('y'))
    const quarter = parseInt(period.get('q'))
    const month = parseInt(period.get('m'))
    let current, currentLabel, prev, prevLabel



    if (month) {
      current = month
      prev = (month == 1)? 12: month - 1
      currentLabel = (<MonthLabel month={getMonthName(month)} year={year}/>)
      const prevYear = (current==1) ? year-1 : year
      prevLabel = (<MonthLabel month={getMonthName(prev)} year={prevYear}/>)
    } else if (quarter) {
      current = quarter
      prev = (quarter == 1) ? 4: quarter - 1
      const prevYear = (current==1) ? year-1 : year
      currentLabel = (<QuarterLabel start={getQuarterLabel(current).start } end={getQuarterLabel(current).end} year={year}/>)
      prevLabel = (<QuarterLabel start={getQuarterLabel(prev).start } end={getQuarterLabel(prev).end} year={prevYear}/>)
    } else {
      current = year
      prev = year - 1
      currentLabel = current;
      prevLabel = prev;
    }

    const deseases = this.props.diagnoses.get('data')? this.props.diagnoses.get('data').sortBy((val)=>-val.get('total')) : [];
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
    return (
      <div className="top-ten-deseases">
        <div className="sub-title"><Trans>Out-Patient Diseases (OPD) at</Trans> {facilityName} </div>
        <div className="download">
          <a className="csv" href={getDownloadURI(type,'diagnoses','csv', id, period.toJS(), language)} target="_blank"></a>
          <a className="json" href={getDownloadURI(type,'diagnoses','json', id, period.toJS(), language)} target="_blank"></a>
          <div className="separator"/>
          <div className={OPDView === 'table' ? 'table-selected' : 'table'} onClick={e => this.setOPDView('table')}></div>
          <div className={OPDView === 'barChart' ? 'barChart-selected' : 'barChart'} onClick={e => this.setOPDView('barChart')}></div>
        </div>
        {OPDView === 'barChart' && <OPDBarchart period={period} id={id} facilityName={facilityName} diagnoses={this.props.diagnoses}/>}
        {OPDView === 'table' &&
          <div className="top-ten-diagnosis-table">
            <div className="value-legend"><b>% <Trans>Change</Trans> <Trans>Legend</Trans></b> +<Trans>Increasing</Trans> / -<Trans>Decreasing</Trans></div>
            <table className="">
              <tbody>
                <tr>
                  <th className="diagnosis-header" rowSpan="2"><Trans>Top Ten Diagnoses</Trans></th>
                  <th className="previous-period-header" colSpan="4"><div>{prevLabel}</div><div className={previousExpanded ? 'collapse-column' : 'expand-column'} onClick={e => this.onToggleExpand('previous')}></div></th>
                  <th className="current-period-header" colSpan="4"><div>{currentLabel}</div><div className={currentExpanded ? 'collapse-column' : 'expand-column'} onClick={e => this.onToggleExpand('current')}></div></th>
                  <th className="previous-period-header left-align">%<Trans>Change</Trans></th>
                </tr>
                <tr>
                  <td className="previous-period-sub-header-partial">{previousExpanded && <div><Trans>Age</Trans>&lt; 5</div>}</td>
                  <td className="previous-period-sub-header-partial">{previousExpanded && <div><Trans>Age</Trans>{'5-60'}</div>}</td>
                  <td className="previous-period-sub-header-partial">{previousExpanded && <div><Trans>Age</Trans>{'>60'}</div>}</td>
                  <td className="previous-period-sub-header left-align"><Trans>Count</Trans></td>
                  <td className="current-period-sub-header-partial">{currentExpanded && <div><Trans>Age</Trans>&lt; 5</div>}</td>
                  <td className="current-period-sub-header-partial">{currentExpanded && <div><Trans>Age</Trans>{'5-60'}</div>}</td>
                  <td className="current-period-sub-header-partial">{currentExpanded && <div><Trans>Age</Trans>{'>60'}</div>}</td>
                  <td className="current-period-sub-header"><Trans>Count</Trans></td>
                  <td className="previous-period-sub-header"><Trans>since</Trans> {prevLabel}</td>
                </tr>
                {
                  deseases.map((it) => {
                    const label = it.getIn(['diagnostic', 'name'])
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
                    return (<tr key={it.get("dhis2Id")}>
                      <td className="desease-name">{(translation&&translation.get('value'))?translation.get('value') :label}</td>
                      <td className="previous-value-partial">{previousExpanded && <div>{totalUnder5Prev == -1 ? 'N/A' : totalUnder5Prev}</div>}</td>
                      <td className="previous-value-partial">{previousExpanded && <div>{total5to60Prev == -1 ? 'N/A' : total5to60Prev}</div>}</td>
                      <td className="previous-value-partial">{previousExpanded && <div>{totalAbove60Prev == -1 ? 'N/A' : totalAbove60Prev}</div>}</td>
                      <td className="previous-value">{totalPrevPeriod == -1 ? 'N/A' : totalPrevPeriod}</td>
                      <td className="current-value-partial">{currentExpanded && <div>{totalUnder5 == -1 ? 'N/A' : totalUnder5}</div>}</td>
                      <td className="current-value-partial">{currentExpanded && <div>{total5to60 == -1 ? 'N/A' : total5to60}</div>}</td>
                      <td className="current-value-partial">{currentExpanded && <div>{totalAbove60 == -1 ? 'N/A' : totalAbove60}</div>}</td>
                      <td className="current-value">{total == -1 ? 'N/A' : total}</td>
                      <td className="previous-value">{totalPrevPeriod == -1 || total == -1 ? 'N/A' : `${diffPercent > 0 ? '+' : ''}${diffPercent}%` }</td>
                    </tr>)
                  })
                }
                <tr className="total-values">
                  <td className="desease-name"><Trans>Total</Trans></td>
                  <td className="previous-value-partial">{previousExpanded && <div>{colsTotals['totalUnder5Prev']}</div>}</td>
                  <td className="previous-value-partial">{previousExpanded && <div>{colsTotals['total5to60Prev']}</div>}</td>
                  <td className="previous-value-partial">{previousExpanded && <div>{colsTotals['totalAbove60Prev']}</div>}</td>
                  <td className="previous-value">{colsTotals['totalPrevPeriodHasValue']?colsTotals['totalPrevPeriod'] :'N/A'} </td>
                  <td className="current-value-partial">{currentExpanded && <div>{colsTotals['totalUnder5']}</div>}</td>
                  <td className="current-value-partial">{currentExpanded && <div>{colsTotals['total5to60']}</div>}</td>
                  <td className="current-value-partial">{currentExpanded && <div>{colsTotals['totalAbove60']}</div>}</td>
                  <td className="current-value">{colsTotals['total']}</td>
                  <td className="previous-value right">{`${diffPercentage(colsTotals['totalPrevPeriod'], colsTotals['total']) > 0 ? '+' : ''}

                  ${diffPercentage(colsTotals['totalPrevPeriod'], colsTotals['total'])?diffPercentage(colsTotals['totalPrevPeriod'], colsTotals['total'])+"%":"N/A"}

                  `}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}

export default translate("translations")(TopTenDeseases)
