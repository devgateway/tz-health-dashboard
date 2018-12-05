import React from 'react'
import {translate, Trans} from "react-i18next";
import {getMonthName,getQuarterLabel, diffPercentage,parsePeriod,getDownloadURI} from '../../../../../api'
import {MonthLabel,QuarterLabel} from './labels'


class TopTenDeseases extends React.Component {

  constructor(props) {
    super(props);
    this.state = {expanded: true};
  }

  onToggleExpand(){
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const {id,type,period,facilityName, i18n: {language}} = this.props
    const {expanded} = this.state    
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
      totalPrevPeriod: 0,
      total: 0
    }

    return (<div className="top-ten-diagnosis-table">
      <div className="sub-title"><Trans>Out-Patient Diseases (OPD) at</Trans> {facilityName}</div>
      <div className="value-legend"><b><Trans>Legend</Trans></b> +<Trans>Increasing</Trans> -<Trans>Decreasing</Trans></div>
      <table className="">
        <tbody>
          <tr>
            <th className="diagnosis-header" rowSpan="2"><Trans>Top Ten Diagnoses</Trans></th>
            <th className="previous-period-header">{prevLabel}</th>
            <th className="current-period-header" colSpan="4"><div>{currentLabel}</div><div className={expanded ? 'collapse-column' : 'expand-column'} onClick={e => this.onToggleExpand()}></div></th>
            <th className="previous-period-header">%<Trans>Change</Trans></th>
          </tr>
          <tr>
            <td className="previous-period-sub-header"><Trans>Count</Trans></td>
            <td className="current-period-sub-header-partial">{expanded && <div><Trans>Age</Trans>&lt; 5</div>}</td>
            <td className="current-period-sub-header-partial">{expanded && <div><Trans>Age</Trans>{'5-60'}</div>}</td>
            <td className="current-period-sub-header-partial">{expanded && <div><Trans>Age</Trans>{'>60'}</div>}</td>
            <td className="current-period-sub-header"><Trans>Count</Trans></td>
            <td className="previous-period-sub-header"><Trans>in Total Cases since</Trans> {prevLabel}</td>
          </tr>
          {
            deseases.map((it) => {
              const label = it.getIn(['diagnostic', 'name'])
              const translation=it.getIn(['diagnostic', 'translations']).find(e=>e.get('locale') == language);
              const totalUnder5 = it.getIn(['ranges', 'totalUnder5'])
              const total5to60 = it.getIn(['ranges', 'total5to60'])
              const totalAbove60 = it.getIn(['ranges', 'totalAbove60'])
              const totalPrevPeriod = it.getIn(['totalPrevPeriod'])
              const total = it.get("total");
              if (totalUnder5 != -1) {
                colsTotals['totalUnder5'] += totalUnder5
              }
              if (total5to60 != -1) {
                colsTotals['total5to60'] += total5to60
              }
              if (totalAbove60 != -1) {
                colsTotals['totalAbove60'] += totalAbove60
              }
              colsTotals['totalPrevPeriod'] += totalPrevPeriod
              colsTotals['total'] += total

              return (<tr key={it.get("dhis2Id")}>
                <td className="desease-name">{(translation&&translation.get('value'))?translation.get('value') :label}</td>
                <td className="previous-value">{it.get("totalPrevPeriod")}</td>
                <td className="current-value-partial">{expanded && <div>{totalUnder5 != -1 ? 'N/A' : totalUnder5}</div>}</td>
                <td className="current-value-partial">{expanded && <div>{total5to60 != -1 ? 'N/A' : total5to60}</div>}</td>
                <td className="current-value-partial">{expanded && <div>{totalAbove60 != -1 ? 'N/A' : totalAbove60}</div>}</td>
                <td className="current-value">{total}</td>
                <td className="previous-value">{diffPercentage(it.get("totalPrevPeriod"),total)}</td>
              </tr>)
            })
          }
          <tr className="total-values">
            <td className="desease-name"><Trans>Total</Trans></td>
            <td className="previous-value">{colsTotals['totalPrevPeriod']}</td>
            <td className="current-value-partial">{expanded && <div>{colsTotals['totalUnder5']}</div>}</td>
            <td className="current-value-partial">{expanded && <div>{colsTotals['total5to60']}</div>}</td>
            <td className="current-value-partial">{expanded && <div>{colsTotals['totalAbove60']}</div>}</td>
            <td className="current-value">{colsTotals['total']}</td>
            <td className="previous-value"> {diffPercentage(colsTotals['totalPrevPeriod'],colsTotals['total'])}</td>
          </tr>
        </tbody>
      </table>

      <div className="download csv">
        <a href={getDownloadURI(type,'diagnoses','csv',id,period.toJS(),language)}>CSV</a>
        <a href={getDownloadURI(type,'diagnoses','json',id,period.toJS(),language)}>JSON</a>
      </div>
    </div>)
  }
}

export default translate("translations")(TopTenDeseases)
