import React from 'react'
import {translate, Trans} from "react-i18next"

class PeriodSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      years: [
        {gid: 'y-2016', label: '2016'},
        {gid: 'y-2017', label: '2017'}
      ],
      quarters: [
        {gid: 'q-1', label: 'January-March'},
        {gid: 'q-2', label: 'April-June'},
        {gid: 'q-3', label: 'July-September'},
        {gid: 'q-4', label: 'October-December'}
      ],
      months: [
        {gid: 'm-1', label: 'January'},
        {gid: 'm-2', label: 'February'},
        {gid: 'm-3', label: 'March'},
        {gid: 'm-4', label: 'April'},
        {gid: 'm-5', label: 'May'},
        {gid: 'm-6', label: 'June'},
        {gid: 'm-7', label: 'July'},
        {gid: 'm-8', label: 'August'},
        {gid: 'm-9', label: 'September'},
        {gid: 'm-10', label: 'October'},
        {gid: 'm-11', label: 'November'},
        {gid: 'm-12', label: 'December'}
      ],
      periodType: 'yearly',
    }
  }


  componentDidMount() {
    const {period} = this.props
    if (period) {
      const periodSp = period.split('_')
      if (periodSp.length === 1) {
        this.setState({periodType: 'yearly'})
      } else {
        if (periodSp[1].startsWith('m')) {
          this.setState({periodType: 'monthly'})
        } else {
          this.setState({periodType: 'quarterly'})
        }
      }
    } else {
      this.setState({periodType: 'yearly'})
    }

  }

  onChangeType(e){
    this.setState({periodType: e.target.value})
  }

  onChangePeriod(e){
    this.props.onChangePeriod(e.target.value)
  }

  render() {
    const { years, months, quarters, periodType } = this.state
    const { period = 'y-2017' } = this.props
    let options = years
    if (periodType === 'quarterly') {
      options = []
      years.forEach(y => {
        quarters.forEach(q => {
          options.push({gid: `${y.gid}_${q.gid}`, label: `${q.label} ${y.label}`})
        })
      })
    } else if (periodType === 'monthly') {
      options = []
      years.forEach(y => {
        months.forEach(m => {
          options.push({gid: `${y.gid}_${m.gid}`, label: `${m.label} ${y.label}`})
        })
      })
    }

    return (
      <div className="period-selector-container">
        <div className="">
          <div className="period-type-selector">
            <select value={periodType} className="" onChange={e => this.onChangeType(e)} >
              <option value="monthly"><Trans>Monthly</Trans></option>
              <option value="quarterly"><Trans>Quarterly</Trans></option>
              <option value="yearly"><Trans>Yearly</Trans></option>
            </select>
          </div>
          <div className="period-selector">
            <select  className="" onChange={e => this.onChangePeriod(e)} value={period}>
              <option value={-1}><Trans>Select a period</Trans></option>
              {options.map(option => {
                return <option key={`${option.gid}`} value={option.gid}>{option.label}</option>
              })}
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default translate("translations")(PeriodSelector)
