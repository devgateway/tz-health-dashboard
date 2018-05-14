import React from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {findDistricts,  findWards} from '../../../modules/dashboard'
import D3Map from '../../../../../components/d3Map.jsx'


class MapView extends React.Component {

  componentWillMount() {
    this.props.onLoad()
  }

  render() {

    return (
      <div>

        <D3Map width="500" height="500" colors={["#FFF275" ,'#6C8EAD']} onFeatureClick={f=>{
              const districtId=f.properties.ID
            this.props.onDistricSelect({districtId})

          }} features={this.props.districts}>
          <h2>Tanzania Distrcits</h2>

        </D3Map>

        <D3Map width="500" height="500" colors={["#FF8C42", '#0C4700'] } onFeatureClick={f=>{}} features={this.props.wards}>
            <h2> {}  Wards</h2>
        </D3Map>


      </div>
  )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  onLoad: findDistricts,
  onDistricSelect:findWards
}, dispatch)

const mapStateToProps = state => {

  return {
    districts: state.getIn(['dashboard','districts']),
    wards: state.getIn(['dashboard','wards'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
