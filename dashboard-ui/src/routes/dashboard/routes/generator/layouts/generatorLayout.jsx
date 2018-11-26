import React from 'react'
import PropTypes from "prop-types"
import D3Map from '../../../../../components/d3Map'
import TextSearch from '../containers/textSearchContainer'
import {composePeriod} from '../../../../../api'
import {translate, Trans, t} from "react-i18next"
import i18n from '../../../../../i18n'

class WardLayout extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

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
      periodType: 'yearly',
      period: null,
      selection: {}
    }
  }

  onChangeType(e) {
    this.setState({periodType: e.target.value})
    this.setState({period: null})
  }

  onChangePeriod(e) {
    this.setState({period: e.target.value})
  }

  componentDidMount() {
    const { getGeoItemsList } = this.props
    getGeoItemsList('region', {})
  }

  onKeywordSearchSelection(selection) {
    const { selectRegion } = this.props
    selectRegion(null) //clear location dropdowns selections
    const { selectFacility, selectWard, params: {reportType} } = this.props
    if (reportType === 'facility') {
      selectFacility(selection.id)
    } else {
      selectWard(selection.gid)
    }    
  }

  onChangeRegion(e) {
    const regionId = e.target.value === '-1' ? null : e.target.value
    const { selectRegion, getGeoItemsList, params: {reportType} } = this.props
    selectRegion(regionId)
    this.child.onCleanSelection() //clear keyword search box
    if (regionId) {
      getGeoItemsList('district', {regions: [regionId],simplifyFactor:0})
    }
  }

  onChangeDistrict(e) {
    const districtId = e.target.value === '-1' ? null : e.target.value
    const { selectDistrict, getGeoItemsList, params: {reportType} } = this.props
    selectDistrict(districtId)
    if (districtId) {
      getGeoItemsList('ward', {districts: [districtId],simplifyFactor:0})
      if (reportType === 'ward') {
        getGeoItemsList('facility', {districts: [districtId]})
      }
    }
  }

  onChangeWard(e) {
    const wardId = e.target.value === '-1' ? null : e.target.value
    const { selectWard, getGeoItemsList, params: {reportType} } = this.props
    selectWard(wardId)
    if (wardId) {
      if (reportType === 'facility') {
        getGeoItemsList('facility', {wards: [wardId]})
      }
    }
  }

  onChangeFacility(e) {
    const facilityId = e.target.value === '-1' ? null : e.target.value
    const { selectFacility } = this.props
    selectFacility(facilityId)
  }

  onFeatureClick(feature) {
    const featureId = feature.properties.ID
    const { region, district, ward, facility, selectWard, selectDistrict, selectRegion, getGeoItemsList, params: {reportType} } = this.props
    if (ward.get('selected')) {
      //do nothing
    } else if (district.get('selected')) {
      selectWard(featureId)
      if (reportType === 'facility') {
        getGeoItemsList('facility', {wards: [featureId]})
      }
    } else if (region.get('selected')){
      selectDistrict(featureId)
      getGeoItemsList('ward', {districts: [featureId],simplifyFactor:0})
      if (reportType === 'ward') {
        getGeoItemsList('facility', {districts: [featureId]})
      }
    } else {
      selectRegion(featureId)
      this.child.onCleanSelection() //clear keyword search box
      getGeoItemsList('district', {regions: [featureId],simplifyFactor:0})
    }
  }

  onFacilityClicked(feature) {
    const { selectFacility } = this.props
    selectFacility(feature.properties.ID)
  }

  onReset() {
    const { selectRegion } = this.props
    this.child.onCleanSelection() //clear keyword search box
    selectRegion(null) //clear location dropdowns selections
    this.setState({period: null})//clear the period selector
  }

  onGenerateReport() {
    const lan = this.props.i18n.language
    const { period } = this.state
    const { ward, facility, params: {reportType} } = this.props
    if (reportType === 'ward') {
      this.context.router.history.push(`/${lan}/report/ward/${ward.get('selected')}/${period}`)
    } else {
      this.context.router.history.push(`/${lan}/report/facility/${facility.get('selected')}/${period}`)
    }
  }

  render() {
    const { region, district, ward, facility, params: {reportType} } = this.props
    const {years, months, quarters, periodType, period} = this.state
    let mapShapes = region.get('list').toJS()
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
    if (ward.get('selected')) {
      const wardFeature = ward.get('list').toJS().features.find(f => f.properties.ID == ward.get('selected'))
      if (wardFeature) {
        mapShapes = {'type': 'FeatureCollection', 'features': [wardFeature]}
      }
    } else if (district.get('selected')) {
      mapShapes = ward.get('list').toJS()
    } else if (region.get('selected')){
      mapShapes = district.get('list').toJS()
    }

    let mapPoints = null

    if (reportType === 'ward') {
      if (district.get('selected')) {
        const facilitiesFeatures = []
        facility.get('list').map(f => facilitiesFeatures.push({properties: {ID: f.get('id'), NAME: f.get('name'), fillColor: f.getIn(['ward', 'gid']) == ward.get('selected') ? '#2c772f' : null, strokeColor: '#57595d'}, geometry: f.get('point').toJS()}))
        mapPoints = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
      }
    } else {
      if (ward.get('selected')) {
        const facilitiesFeatures = []
        facility.get('list').map(f => facilitiesFeatures.push({properties: {ID: f.get('id'), NAME: f.get('name'), fillColor: f.get('id') == facility.get('selected') ? '#980707' : null, strokeColor: '#57595d'}, geometry: f.get('point').toJS()}))
        mapPoints = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
      }
    }
    
    return (
  	  <div className="report-generator-container">
  	    <div className="">
          <div className="report-generator-paragraph">
            <div className={`${reportType}-icon`}></div>
            <span className={`highlighted-${reportType}`}><Trans>{`${reportType} report generator`}</Trans>: </span>
            {reportType === 'ward' ?
              <span className=""><Trans>Create a custom data report for a ward</Trans></span>
            :
              <span className=""><Trans>Create a custom data report for a health facility</Trans></span>
            }
          </div>
          <div className="dashed-separator"></div>
          <div className="step-one-box">
            <div className="step-descriptor"><div><Trans>Step one</Trans>: </div><b> <Trans>Select a {reportType}</Trans></b> <Trans>by typing it name in the</Trans> <i><Trans>{reportType} search</Trans> </i>below</div>
            <TextSearch searchType={reportType} onSelection={e => this.onKeywordSearchSelection(e)} onRef={ref => (this.child = ref)}/>
            <div className="step-descriptor"><div><Trans>OR</Trans>: </div><b> <Trans>Select a {reportType}</Trans></b> <Trans>by location using the</Trans> <i><Trans>{reportType} filter</Trans> </i>box or map below</div>
            <div className="generator-by-path">
              <div className="generator-dropdowns">
                <div className={`report-type-${reportType}`}>
                  <Trans>{`${reportType} filter`}</Trans>
                </div>
                <div className="path-dropdown">
                  <div className="dropdown-title"><Trans>Regions</Trans></div>
                  <div className="">
                    <select value={region.get('selected') || -1} className="" onChange={e => this.onChangeRegion(e)} >
                      <option value={-1}><Trans>Select a region</Trans></option>
                      {region.getIn(['list', 'features']).map(option => {
                        return <option key={`region-${option.getIn(['properties', 'ID'])}`} value={option.getIn(['properties', 'ID'])}>{option.getIn(['properties', 'NAME'])}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className="path-dropdown">
                  <div className="dropdown-title"><Trans>Districts</Trans></div>
                  <div className="">
                    <select value={district.get('selected') || -1} className="" onChange={e => this.onChangeDistrict(e)} >
                      <option value={-1}><Trans>Select a district</Trans></option>
                      {district.getIn(['list', 'features']).map(option => {
                        return <option key={`district-${option.getIn(['properties', 'ID'])}`} value={option.getIn(['properties', 'ID'])}>{option.getIn(['properties', 'NAME'])}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className="path-dropdown">
                  <div className="dropdown-title"><Trans>Wards</Trans></div>
                  <div className="">
                    <select value={ward.get('selected') || -1} className="" onChange={e => this.onChangeWard(e)} >
                      <option value={-1}><Trans>Select a ward</Trans></option>
                      {ward.getIn(['list', 'features']).map(option => {
                        return <option key={`ward-${option.getIn(['properties', 'ID'])}`} value={option.getIn(['properties', 'ID'])}>{option.getIn(['properties', 'NAME'])}</option>
                      })}
                    </select>
                  </div>
                </div>
                {(reportType === 'facility') ?
                  <div className="path-dropdown">
                    <div className="dropdown-title"><Trans>Facilities</Trans></div>
                    <div className="">
                      <select value={facility.get('selected') || -1} className="" onChange={e => this.onChangeFacility(e)} >
                        <option value={-1}><Trans>Select a facility</Trans></option>
                        {facility.getIn(['list']).map(option => {
                          return <option key={`facility-${option.getIn(['id'])}`} value={option.getIn(['id'])}>{option.getIn(['name'])}</option>
                        })}
                      </select>
                    </div>
                  </div>
                : null}        
              </div>
              <div className="generator-map">
                {mapShapes.features.length > 0 ?
                  <D3Map width="490" height="480" colors={["#FF8C42", '#0C4700']}
                    shapeFillOpacity="0" shapeStrokeWidth='2' shapeStrokeColor="#9C8568"
                    onFeatureClick={f => this.onFeatureClick(f)} onPointClick={f => this.onFacilityClicked(f)}
                    shapeFeatures={mapShapes} pointFeatures={mapPoints} showBasemap={true}  zoomeable={true}></D3Map>
                : null}
              </div>
            </div>
          </div>
          <div className={(reportType === 'facility' && facility.get('selected')) || (reportType === 'ward' && ward.get('selected')) ? 'step-two-box' : 'step-two-box disabled'}>
            <div className="step-descriptor"><div><Trans>Step Two</Trans>: </div><b><Trans>Select a Timeframe</Trans></b></div>
            <div className="generator-period">
              <div className={`period-header-${reportType}`}><Trans>Date Filter</Trans></div>
              <div className="period-paragraph"><Trans>After selecting a {reportType} select the time period (yearly, quarterly, or monthly) and desired dates</Trans></div>
              <div className="path-dropdown">
                <div className="dropdown-title"><Trans>Time Period</Trans></div>
                <div className="">
                  <select value={periodType} className="" onChange={e => this.onChangeType(e)}>
                    <option value="monthly">{i18n.t('Monthly')}</option>
                    <option value="quarterly">{i18n.t('Quarterly')}</option>
                    <option value="yearly">{i18n.t('Yearly')}</option>
                  </select>
                </div>
              </div>
              <div className="path-dropdown">
                <div className="dropdown-title"><Trans>Date</Trans></div>
                <div className="">
                  <select onChange={e => this.onChangePeriod(e)} value={period || -1}>
                    <option value={-1}>{i18n.t('Select a period')}</option>
                    {
                      options.map(option => {
                        return <option key={`${option.gid}`} value={option.gid}>{option.label}</option>
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="period-paragraph">
                <Trans>Click on the</Trans> <div className="generate"><Trans>Generate Report</Trans></div> <Trans>button to create your custom data report, or click on the</Trans> <div className="reset"><Trans>Reset</Trans></div> <Trans>button to clear all search and filter selections</Trans>                 
              </div>
              <div className="action-buttons">
                <div className="reset-button" onClick={e => this.onReset()}></div>
                {period ?
                  <div className="generate-button" onClick={e => this.onGenerateReport()}><Trans>Generate Report</Trans></div>
                :
                  <div className="generate-button-disabled"><Trans>Generate Report</Trans></div>
                }
              </div>    
            </div>
          </div>
          <div className="info-box">
            <div className="info-icon"></div>
            <div className="info-paragraph">
              <Trans>The</Trans> <div className="generate"><Trans>Generate Report</Trans></div> <Trans>will not engage until you have selected a valid {reportType}, time period, and date. First, select a {reportType}, either through the search or filter boxes in Step One, then select a time period in Step Two.</Trans>
            </div>
          </div>
        </div>
  	  </div>
  	)
  }
}

export default translate("translations")(WardLayout)
