import React from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {findDistricts, wardSelected, districtSelected, CATEGORY_WARD, CATEGORY_DISTRICT} from '../../../modules/dashboard'
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
    this.context.router.history.push(`/wardReport/${feature.properties.ID}/y`)
    this.props.onWardSelected(feature)
  }

  render() {
    const {ward, district} = this.props
    return (<div className="maps-container">
      <div className="infoBlock country">

        <D3Map width="500" height="500" colors={["#FFF275", '#6C8EAD']} onFeatureClick={f => this.props.onDistricSelected(f)} features={this.props.districts}></D3Map>

      </div>
      {
        district
          ? <div className="infoBlock district">
              <h2>{district.properties['NAME']}</h2>
              <D3Map width="500" height="500" colors={["#FF8C42", '#0C4700']} onFeatureClick={f => this.onWardSelected(f)} features={this.props.wards}></D3Map>
            </div>
          : null
      }

      {
        ward
          ? <div className="infoBlock ward">
              <h2>{ward.name}</h2>
              <table>
                <tr>
                  <td>Population</td>
                  <td>Male</td>
                  <td>Female</td>
                </tr>
                <tr>
                  <td>{ward.population}</td>
                  <td>{ward.populationMale}</td>
                  <td>{ward.populationFemale}</td>
                </tr>
                <tr>
                  <td colSpan="3">Rural</td>
                </tr>
                <tr>
                  <td>{ward.populationRural}</td>
                  <td>{ward.populationRuralMale}</td>
                  <td>{ward.populationRuralFemale}</td>
                </tr>

                <tr>
                  <td colSpan="3">Urban</td>
                </tr>
                <tr>
                  <td>{ward.populationUrban}</td>
                  <td>{ward.populationUrbanMale}</td>
                  <td>{ward.populationUrbanFemale}</td>
                </tr>
              </table>

            </div>
          : null
      }

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
    wards: state.getIn(['dashboard', CATEGORY_WARD, 'list'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
