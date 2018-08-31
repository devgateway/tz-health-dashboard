import React from 'react'

export default class TopTenDeseases extends React.Component {

  render() {

    const period = 2017

    const deseases = this.props.diagnoses.get('data') || [];
    let colsTotals = {
      totalUnder5: 0,
      total5to60: 0,
      totalAbove60: 0,
      totalPrevPeriod: 0,
      total:0
    }
    return (<div className="top-ten-diagnosis-table">
      <table className="">
        <tbody>
          <tr>
            <th className="diagnosis-header" rowSpan="2">Top Ten Diagnoses</th>
            <th className="previous-period-header">{period - 1}</th>
            <th className="current-period-header" colSpan="4">{period}</th>
            <th className="previous-period-header">% Change</th>
          </tr>
          <tr>
            <td className="previous-period-sub-header">Total Count</td>
            <td className="current-period-sub-header-partial">{'Age <5'}</td>
            <td className="current-period-sub-header-partial">{'Age 5-60'}</td>
            <td className="current-period-sub-header-partial">{'Age >60'}</td>
            <td className="current-period-sub-header">Total Count</td>
            <td className="previous-period-sub-header">in Total Cases since Last Year</td>
          </tr>
          {
            deseases.map((it) => {
              const totalUnder5 = it.getIn(['ranges', 'totalUnder5'])
              const total5to60 = it.getIn(['ranges', 'total5to60'])
              const totalAbove60 = it.getIn(['ranges', 'totalAbove60'])
              const totalPrevPeriod = it.getIn(['totalPrevPeriod'])
              const total=it.get("total");
              colsTotals['totalUnder5'] += totalUnder5
              colsTotals['total5to60'] += total5to60
              colsTotals['totalAbove60'] += totalAbove60
              colsTotals['totalPrevPeriod'] += totalPrevPeriod
              colsTotals['total'] += total

              return (<tr>
                <td className="desease-name">{it.get("diagnostic")}</td>
                <td className="previous-value">{it.get("totalPrevPeriod")}</td>
                <td className="current-value-partial">{totalUnder5}</td>
                <td className="current-value-partial">{total5to60}</td>
                <td className="current-value-partial">{totalAbove60}</td>
                <td className="current-value">{total}</td>
                <td className="previous-value">{((((totalPrevPeriod-total)/totalPrevPeriod)*100)*-1).toFixed(2)}%</td>
              </tr>)
            })
          }
          <tr className="total-values">
            <td className="desease-name">Total</td>
            <td className="previous-value"> {colsTotals['totalPrevPeriod']}</td>
              <td className="current-value-partial">
                {colsTotals['totalUnder5']}</td>
            <td className="current-value-partial">{colsTotals['total5to60']}</td>
            <td className="current-value-partial">{colsTotals['totalAbove60']}</td>
            <td className="current-value">{colsTotals['total']}</td>
            <td className="previous-value">{((((colsTotals['totalPrevPeriod']-colsTotals['total'])/colsTotals['totalPrevPeriod'])*100)*-1).toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>)
  }
}