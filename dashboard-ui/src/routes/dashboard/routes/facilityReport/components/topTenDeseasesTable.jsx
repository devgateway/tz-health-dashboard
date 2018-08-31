import React from 'react'

export default class TopTenDeseases extends React.Component {

  render() {

    const period = 2017

    const deseases = this.props.diagnoses.get('data') || [];
    return (
      <div className="top-ten-diagnosis-table">
        <table className="">
          <tbody>
            <tr>
              <th className="diagnosis-header" rowSpan="2">Top Ten Diagnoses</th>
              <th className="previous-period-header">{period}</th>
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
            {deseases.map((it)=> {
              debugger;
              return (
                <tr>
                  <td className="desease-name">{it.get("diagnostic")}</td>
                  <td className="previous-value">{}</td>
                  <td className="current-value-partial">{it.getIn(['ranges','lessThan5'])}</td>
                  <td className="current-value-partial">{it.getIn(['ranges','between5and60'])}</td>
                  <td className="current-value-partial">{it.getIn(['ranges','greaterThan60'])}</td>
                  <td className="current-value">{it.getIn(['ranges','total'])}</td>
                  <td className="previous-value"></td>
                </tr>
              )
            })}
            <tr className="total-values">
              <td className="desease-name">Total</td>
              <td className="previous-value"></td>
              <td className="current-value-partial"></td>
              <td className="current-value-partial"></td>
              <td className="current-value-partial"></td>
              <td className="current-value"></td>
              <td className="previous-value"></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
