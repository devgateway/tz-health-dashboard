import React from 'react'
import {translate, Trans, t} from "react-i18next"
import i18n from '../../../../../i18n'

class PeriodSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      years: [
        {
          gid: 'y-2016',
          label: '2016'
        }, {
          gid: 'y-2017',
          label: '2017'
        }
      ],
      quarters: [
        {gid: 'q-1', label: `${i18n.t('January')}-${i18n.t('March')}`},
        {gid: 'q-2', label: `${i18n.t('April')}-${i18n.t('June')}`},
        {gid: 'q-3', label: `${i18n.t('July')}-${i18n.t('September')}`},
        {gid: 'q-4', label: `${i18n.t('October')}-${i18n.t('December')}`}
      ],
      months: [
        {gid: 'm-1', label: i18n.t('January')},
        {gid: 'm-2', label: i18n.t('February')},
        {gid: 'm-3', label: i18n.t('March')},
        {gid: 'm-4', label: i18n.t('April')},
        {gid: 'm-5', label: i18n.t('May')},
        {gid: 'm-6', label: i18n.t('June')},
        {gid: 'm-7', label: i18n.t('July')},
        {gid: 'm-8', label: i18n.t('August')},
        {gid: 'm-9', label: i18n.t('September')},
        {gid: 'm-10', label: i18n.t('October')},
        {gid: 'm-11', label: i18n.t('November')},
        {gid: 'm-12', label: i18n.t('December')}

      ],
      periodType: 'yearly'
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

  onChangeType(e) {
    this.setState({periodType: e.target.value})
  }

  onChangePeriod(e) {
    this.props.onChangePeriod(e.target.value)
  }

  render() {
    const {years, months, quarters, periodType} = this.state
    const {
      period = 'y-2017',
      t,
      i18n
    } = this.props

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

    return (<div className="period-selector-container">
      <div className="">
        <div className="period-type-selector">
          <select value={periodType} className="" onChange={e => this.onChangeType(e)}>
            <option value="monthly">{t("Monthly")}</option>
            <option value="quarterly">{t("Quarterly")}</option>
            <option value="yearly">{t("Yearly")}</option>
          </select>
        </div>
        <div className="period-selector">
          <select className="" onChange={e => this.onChangePeriod(e)} value={period}>
            <option value={-1}>{t("Select a period")}</option>
            {
              options.map(option => {
                return <option key={`${option.gid}`} value={option.gid}>{option.label}</option>
              })
            }
          </select>
        </div>
      </div>
    </div>)
  }
}

export default translate("translations")(PeriodSelector)
