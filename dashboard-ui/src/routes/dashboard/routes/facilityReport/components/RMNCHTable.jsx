import React from 'react'

export default class RMNCHTable extends React.Component {

  render() {
    const cares = [
      {name: 'Women Attending Antenatal Care - 1st Visit', previousValue: 48, currentValue: 47},
      {name: 'Women Attending Antenatal Care - 4th Visit', previousValue: 10, currentValue: 15},
      {name: 'Women Receiving Iron and Folic Supplements ', previousValue: 58, currentValue: 39},
      {name: 'Women Receiving Tetanus Toxoid Injections', previousValue: 75, currentValue: 79},
      {name: 'Deliveries Assisted by Skilled Health Attendant', previousValue: 66, currentValue: 53},
      {name: 'Children <1 Year Receiving Measles Vaccination', previousValue: 20, currentValue: 23},
      {name: 'Children <1 Year Receiving PENTA3 Vaccination', previousValue: 35, currentValue: 40},
      {name: 'Children 6-59 Months Receiving Vitamin A Supplements', previousValue: 12, currentValue: 14},
   ]
    let totalPrevious = 0
    let totalCurrent = 0
    return (
      <div className="RMNCH-table">
        <table className="">
          <tbody>
            <tr>
              <th className="diagnosis-header" rowSpan="2">RMNCH Services</th>
              <th className="previous-period-header">September 2017</th>
              <th className="current-period-header">October 2017</th>
              <th className="previous-period-header">% Change</th>
            </tr>
            <tr>
              <td className="previous-period-sub-header">Count</td>
              <td className="current-period-sub-header">Count</td>
              <td className="previous-period-sub-header">since September</td>
            </tr>
            {cares.map(it => {
              totalPrevious += it.previousValue
              totalCurrent += it.currentValue
              return (
                <tr>
                  <td className="desease-name">{it.name}</td>
                  <td className="previous-value">{it.previousValue}</td>
                  <td className="current-value">{it.currentValue}</td>
                  <td className="previous-value">{Math.round(((it.currentValue / it.previousValue) - 1) * 100)}%</td>
                </tr>
              )
            })}
            <tr className="total-values">
              <td className="desease-name">Total</td>
              <td className="previous-value">{totalPrevious}</td>
              <td className="current-value">{totalCurrent}</td>
              <td className="previous-value">{Math.round(((totalCurrent / totalPrevious) - 1) * 100)}%</td>
            </tr>
          </tbody>
        </table>
      </div>            
    )
  }
}