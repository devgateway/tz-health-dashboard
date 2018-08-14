import React from 'react'

export default class TopTenDeseases extends React.Component {

  render() {
    const deseases = [
      {name: 'Malaria', previousValue: 480, underFiveCount: 167, fiveToSixtyCount: 256, aboveSixty: 121},
      {name: 'Pneumonia', previousValue: 85, underFiveCount: 22, fiveToSixtyCount: 45, aboveSixty: 13},
      {name: 'Acute Upper Respiratory Infection', previousValue: 60, underFiveCount: 20, fiveToSixtyCount: 25, aboveSixty: 22},
      {name: 'Diarrhoeal Disease', previousValue: 50, underFiveCount: 16, fiveToSixtyCount: 36, aboveSixty: 12},
      {name: 'Anaemia', previousValue: 25, underFiveCount: 12, fiveToSixtyCount: 8, aboveSixty: 9},
      {name: 'Other Respiratory Diseases', previousValue: 23, underFiveCount: 17, fiveToSixtyCount: 4, aboveSixty: 6},
      {name: 'Ill-defined Symptoms', previousValue: 20, underFiveCount: 10, fiveToSixtyCount: 12, aboveSixty: 5},
      {name: 'Prenatal Conditions', previousValue: 18, underFiveCount: 11, fiveToSixtyCount: 6, aboveSixty: 12},
      {name: 'Urinary Tract Infections', previousValue: 15, underFiveCount: 8, fiveToSixtyCount: 4, aboveSixty: 3},
      {name: 'Skin Disease', previousValue: 9, underFiveCount: 5, fiveToSixtyCount: 4, aboveSixty: 1},
    ]
    let totalPrevious = 0
    let totalUnderFive = 0
    let totalFiveToSixty = 0
    let totalAboveSixty = 0
    let totalCurrent = 0
    return (
      <div className="top-ten-diagnosis-table">
        <table className="">
          <tbody>
            <tr>
              <th className="diagnosis-header" rowSpan="2">Top Ten Diagnoses</th>
              <th className="previous-period-header">May-July 2017</th>
              <th className="current-period-header" colSpan="4">August-October 2017</th>
              <th className="previous-period-header">% Change</th>
            </tr>
            <tr>
              <td className="previous-period-sub-header">Total Count</td>
              <td className="current-period-sub-header-partial">{'Age <5'}</td>
              <td className="current-period-sub-header-partial">{'Age 5-60'}</td>
              <td className="current-period-sub-header-partial">{'Age >60'}</td>
              <td className="current-period-sub-header">Total Count</td>
              <td className="previous-period-sub-header">in Total Cases since Last Quarter</td>
            </tr>
            {deseases.map(it => {
              const currentValue = it.underFiveCount + it.fiveToSixtyCount + it.aboveSixty
              totalPrevious += it.previousValue
              totalUnderFive += it.underFiveCount
              totalFiveToSixty += it.fiveToSixtyCount
              totalAboveSixty += it.aboveSixty
              totalCurrent += currentValue
              return (
                <tr>
                  <td className="desease-name">{it.name}</td>
                  <td className="previous-value">{it.previousValue}</td>
                  <td className="current-value-partial">{it.underFiveCount}</td>
                  <td className="current-value-partial">{it.fiveToSixtyCount}</td>
                  <td className="current-value-partial">{it.aboveSixty}</td>
                  <td className="current-value">{currentValue}</td>
                  <td className="previous-value">{Math.round(((currentValue / it.previousValue) - 1) * 100)}%</td>
                </tr>
              )
            })}
            <tr className="total-values">
              <td className="desease-name">Total</td>
              <td className="previous-value">{totalPrevious}</td>
              <td className="current-value-partial">{totalUnderFive}</td>
              <td className="current-value-partial">{totalFiveToSixty}</td>
              <td className="current-value-partial">{totalAboveSixty}</td>
              <td className="current-value">{totalCurrent}</td>
              <td className="previous-value">{Math.round(((totalCurrent / totalPrevious) - 1) * 100)}%</td>
            </tr>
          </tbody>
        </table>
      </div>            
    )
  }
}