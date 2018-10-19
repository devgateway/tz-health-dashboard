import React from 'react'
import PropTypes from "prop-types"
import D3Map from '../../../../../components/d3Map'
import TextSearch from '../containers/textSearchContainer'
import {composePeriod} from '../../../../../api'
export default class WardLayout extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { getGeoItemsList } = this.props
    getGeoItemsList('region', {})
  }

  onChangeRegion(e) {
    const regionId = e.target.value === '-1' ? null : e.target.value
    const { selectRegion, getGeoItemsList, params: {reportType} } = this.props
    selectRegion(regionId)
    getGeoItemsList('district', {regions: [regionId]})
  }

  onChangeDistrict(e) {
    const districtId = e.target.value === '-1' ? null : e.target.value
    const { selectDistrict, getGeoItemsList, params: {reportType} } = this.props
    selectDistrict(districtId)
    getGeoItemsList('ward', {districts: [districtId]})
    if (reportType === 'ward') {
      getGeoItemsList('facility', {districts: [districtId]})
    }
  }

  onChangeWard(e) {
    const wardId = e.target.value === '-1' ? null : e.target.value
    const { selectWard, getGeoItemsList, params: {reportType} } = this.props
    selectWard(wardId)
    if (reportType === 'facility') {
      getGeoItemsList('facility', {wards: [wardId]})
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
      getGeoItemsList('ward', {districts: [featureId]})
      if (reportType === 'ward') {
        getGeoItemsList('facility', {districts: [featureId]})
      }
    } else {
      selectRegion(featureId)
      getGeoItemsList('district', {regions: [featureId]})
    }
  }

  onFacilityClicked(feature) {
    const { selectFacility } = this.props
    selectFacility(feature.properties.ID)
  }

  onGenerateReport() {

    const { ward, facility, period, params: {reportType} } = this.props
    debugger;
    const strPeriod=composePeriod(period.toJS())
    if (reportType === 'ward') {
      this.context.router.history.push(`/report/ward/${ward.get('selected')}/${strPeriod}`)
    } else {
      this.context.router.history.push(`/report/facility/${facility.get('selected')}/${strPeriod}`)
    }
  }

  render() {
    const { region, district, ward,period, facility, params: {reportType} } = this.props



    let mapShapes = region.get('list').toJS()
    if (ward.get('selected')) {
      const wardFeature = ward.get('list').toJS().features.find(f => f.properties.ID == ward.get('selected'))
      mapShapes = {'type': 'FeatureCollection', 'features': [wardFeature]}
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
            <span className={`highlighted-${reportType}`}>{`${reportType} report generator: `}</span>
            {reportType === 'ward' ? 
              <span className="">Create a custom data report for a ward by <b>1. Selecting a Ward</b> by typing its name in the <i>Ward Search</i> or filtering by location using the <i>Ward Filter</i> and map, and then <b>2. Selecting a Time Period</b> in the <i>Date Filter section</i></span>  
            :
              <span className="">Create a custom data report for a health facility by <b>1. Selecting a Facility</b> by typing its name in the <i>Facility Search</i> or filtering by location using the <i>Facility Filter</i> and map, and then <b>2. Selecting a Time Period</b> in the <i>Date Filter section</i></span>  
            }
          </div>
          <div className="dashed-separator"></div>
          <div className=""><TextSearch searchType={reportType}/></div>
          <div className="dashed-separator"></div>
          <div className="generator-by-path">
            <div className={`report-type-${reportType}`}>
              {`${reportType} filter`}
            </div>
            <div className="generator-dropdowns">
              <div className="path-dropdown">
                <div className="dropdown-title">Region</div>
                <div className="">
                  <select value={region.get('selected') || -1} className="" onChange={e => this.onChangeRegion(e)} >
                    <option value={-1}>Select a region</option>
                    {region.getIn(['list', 'features']).map(option => {
                      return <option key={`region-${option.getIn(['properties', 'ID'])}`} value={option.getIn(['properties', 'ID'])}>{option.getIn(['properties', 'NAME'])}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="path-dropdown">
                <div className="dropdown-title">District</div>
                <div className="">
                  <select value={district.get('selected') || -1} className="" onChange={e => this.onChangeDistrict(e)} >
                    <option value={-1}>Select a district</option>
                    {district.getIn(['list', 'features']).map(option => {
                      return <option key={`district-${option.getIn(['properties', 'ID'])}`} value={option.getIn(['properties', 'ID'])}>{option.getIn(['properties', 'NAME'])}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="path-dropdown">
                <div className="dropdown-title">Wards</div>
                <div className="">
                  <select value={ward.get('selected') || -1} className="" onChange={e => this.onChangeWard(e)} >
                    <option value={-1}>Select a ward</option>
                    {ward.getIn(['list', 'features']).map(option => {
                      return <option key={`ward-${option.getIn(['properties', 'ID'])}`} value={option.getIn(['properties', 'ID'])}>{option.getIn(['properties', 'NAME'])}</option>
                    })}
                  </select>
                </div>
              </div>
              {(reportType === 'facility') ?
                <div className="path-dropdown">
                  <div className="dropdown-title">Facilities</div>
                  <div className="">
                    <select value={facility.get('selected') || -1} className="" onChange={e => this.onChangeFacility(e)} >
                      <option value={-1}>Select a facility</option>
                      {facility.getIn(['list']).map(option => {
                        return <option key={`facility-${option.getIn(['id'])}`} value={option.getIn(['id'])}>{option.getIn(['name'])}</option>
                      })}
                    </select>
                  </div>
                </div>
              : null}
              {(reportType === 'facility' && facility.get('selected')) || (reportType === 'ward' && ward.get('selected')) ?
                <div className="generate-button" onClick={e => this.onGenerateReport()}>Generate Report</div>
              :
                <div className="generate-button-disabled">Generate Report</div>
              }
            </div>
            <div className="generator-map">
              {mapShapes.features.length > 0 ?
                <D3Map width="600" height="480" colors={["#FF8C42", '#0C4700']}
                  shapeFillOpacity="0" shapeStrokeWidth='2' shapeStrokeColor="#9C8568"
                  onFeatureClick={f => this.onFeatureClick(f)} onPointClick={f => this.onFacilityClicked(f)}
                  shapeFeatures={mapShapes} pointFeatures={mapPoints} showBasemap={true}  zoomeable={true}></D3Map>
              : null}
            </div>
          </div>
        </div>
  	  </div>
  	)
  }
}
