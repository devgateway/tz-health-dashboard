import React from 'react'
import PropTypes from "prop-types"
import D3Map from '../../../../../components/d3Map'


const REPORT_TYPE = 'ward'

export default class WardLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { getGeoItemsList } = this.props
    getGeoItemsList('region', {})
  }

  onChangeRegion(e) {
    const regionId = e.target.value
    const { selectRegion, getGeoItemsList, reportType = REPORT_TYPE } = this.props
    selectRegion(regionId)
    getGeoItemsList('district', {regions: [regionId]})
  }

  onChangeDistrict(e) {
    const districtId = e.target.value
    const { selectDistrict, getGeoItemsList, reportType = REPORT_TYPE } = this.props
    selectDistrict(districtId)
    getGeoItemsList('ward', {districts: [districtId]})
    if (reportType === 'ward') {
      getGeoItemsList('facility', {districts: [districtId]})
    }
  }

  onChangeWard(e) {
    const wardId = e.target.value
    const { selectWard, getGeoItemsList } = this.props
    selectWard(wardId)
    getGeoItemsList('facility', {wards: [wardId]})
  }

  onChangeFacility(e) {
    const facilityId = e.target.value
    const { selectFacility } = this.props
    selectFacility(facilityId)
  }

  onFeatureClick(feature) {
    const featureId = feature.properties.ID
    const { region, district, ward, facility, selectWard, selectDistrict, selectRegion, getGeoItemsList } = this.props
    if (ward.get('selected')) {
      //do nothing
    } else if (district.get('selected')) {
      selectWard(featureId)
      getGeoItemsList('facility', {wards: [featureId]})
    } else if (region.get('selected')){
      selectDistrict(featureId)
      getGeoItemsList('ward', {districts: [featureId]})
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

  }

  render() {
    const { region, district, ward, facility, reportType = REPORT_TYPE } = this.props
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
    if (ward.get('selected') || (reportType === 'ward' && district.get('selected'))) {
      const facilitiesFeatures = []
      facility.get('list').map(f => facilitiesFeatures.push({properties: {ID: f.get('id'), NAME: f.get('name'), fillColor: f.get('id') == facility.get('selected') ? '#980707' : null, strokeColor: '#57595d'}, geometry: f.get('point').toJS()}))
      mapPoints = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
    }
    
  	return (
  	  <div className="report-generator-container">
  	    <div className=""> 
          <div className="generator-by-path">
            <div className={`report-type-${REPORT_TYPE}`}>
              {`${REPORT_TYPE} filter`}
            </div>
            <div className="generator-dropdowns">
              <div className="path-dropdown">
                <div className="dropdown-title">Region</div> 
                <div className="">
                  <select value={region.get('selected')} className="" onChange={e => this.onChangeRegion(e)} >
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