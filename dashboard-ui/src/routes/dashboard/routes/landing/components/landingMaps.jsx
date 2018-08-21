import React from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {findDistricts, wardSelected, districtSelected, CATEGORY_WARD, CATEGORY_DISTRICT, CATEGORY_FACILITY} from '../../../modules/dashboard'
import D3Map from '../../../../../components/d3Map.jsx'
import PropTypes from 'prop-types'

class MapView extends React.Component {
  
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.onLoad()
  }

  onWardSelected(feature) {
    //this.context.router.history.push(`/wardReport/${feature.properties.ID}/y`)
    this.props.onWardSelected(feature)
  }

  onWardClicked(feature) {
    this.context.router.history.push(`/wardReport/${feature.properties.ID}/y`)
  }

  onFacilityClicked(feature) {
    this.context.router.history.push(`/facilityReport/${feature.properties.ID}/y`)
  }

  render() {
    const {ward, district, wards, districts, facilities} = this.props
    const wardFeature = {'type': 'FeatureCollection', 'features': [ward]}
    const facilitiesFeatures = []
    if (facilities) {
      facilities.forEach(f => facilitiesFeatures.push({properties: {ID: f.id, NAME: f.name}, geometry: f.point}))
    }
    return (<div className="maps-container">
      <div className="infoBlock country">
        <h2>Tanzania</h2>
        <D3Map width="500" height="500" colors={["#FFF275", '#6C8EAD']} onFeatureClick={f => this.props.onDistricSelected(f)} features={districts}></D3Map>
      </div>
      
      {district ? 
        <div className="infoBlock district">
          <h2>{district.properties['NAME']}</h2>
          <D3Map width="500" height="500" colors={["#FF8C42", '#0C4700']} onFeatureClick={f => this.onWardSelected(f)} features={wards}></D3Map>
        </div>
      : null}
      {ward ? 
        <div className="infoBlock district">
          <h2>{ward.properties['NAME']}</h2>
          <D3Map width="500" height="500" colors={["#FF8C42", '#0C4700']} onFeatureClick={f => this.onWardClicked(f)} onPointClick={f => this.onFacilityClicked(f)} features={wardFeature} pointFeatures={facilitiesFeatures}></D3Map>
        </div>
      : null}

    </div>)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  onLoad: findDistricts,
  onWardSelected: wardSelected,
  onDistricSelected: districtSelected
}, dispatch)

const mapStateToProps = state => {

  return {
    district: state.getIn(['dashboard', CATEGORY_DISTRICT, 'selected']),
    ward: state.getIn(['dashboard', CATEGORY_WARD, 'selected']),
    districts: state.getIn(['dashboard', CATEGORY_DISTRICT, 'list']),
    wards: state.getIn(['dashboard', CATEGORY_WARD, 'list']),
    facilities: state.getIn(['dashboard', CATEGORY_FACILITY, 'list'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
