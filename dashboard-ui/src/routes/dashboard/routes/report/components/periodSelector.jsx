import React from 'react'

export default class PeriodSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      years: [
        {id: 'y-2016', label: '2016'}, 
        {id: 'y-2017', label: '2017'}
      ],
      quarters: [
        {id: 'q-1', label: 'January-March'}, 
        {id: 'q-2', label: 'April-June'}, 
        {id: 'q-3', label: 'July-September'}, 
        {id: 'q-4', label: 'October-December'}
      ],
      months: [
        {id: 'm-1', label: 'January'}, 
        {id: 'm-2', label: 'February'}, 
        {id: 'm-3', label: 'March'}, 
        {id: 'm-4', label: 'April'}, 
        {id: 'm-5', label: 'May'}, 
        {id: 'm-6', label: 'June'}, 
        {id: 'm-7', label: 'July'}, 
        {id: 'm-8', label: 'August'}, 
        {id: 'm-9', label: 'September'}, 
        {id: 'm-10', label: 'October'}, 
        {id: 'm-11', label: 'November'}, 
        {id: 'm-12', label: 'December'}
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
        if (periodSp[1].startsWith('M')) {
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
          options.push({id: `${y.id}_${q.id}`, label: `${q.label} ${y.label}`})
        })
      })
    } else if (periodType === 'monthly') {
      options = []
      years.forEach(y => {
        months.forEach(m => {
          options.push({id: `${y.id}_${m.id}`, label: `${m.label} ${y.label}`})
        })
      })
    }

    return (
      <div className="period-selector-container">
        <div className="">
          <div className="period-type-selector">
            <select value={periodType} className="" onChange={e => this.onChangeType(e)} >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="period-selector">
            <select value={period} className="" onChange={e => this.onChangePeriod(e)} >
              <option value={-1}>Select a period</option>
              {options.map(option => {
                return <option key={`${option.id}`} value={option.id}>{option.label}</option>
              })}
            </select>
          </div>
        </div>   
      </div>            
    )
  }
}