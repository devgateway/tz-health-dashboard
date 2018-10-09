import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getGeoItemsList, selectRegion, selectDistrict, selectWard, selectFacility } from '../modules/generatorModule'
import Layout from '../layouts/generatorLayout'

const mapDispatchToProps = dispatch => bindActionCreators({
  getGeoItemsList,
  selectRegion,
  selectDistrict,
  selectWard,
  selectFacility
}, dispatch)

const mapStateToProps = state => {



  return {
    searchResults: state.getIn(['generator', 'searchResults']),
    region: state.getIn(['generator', 'region']),
    district: state.getIn(['generator', 'district']),
    ward: state.getIn(['generator', 'ward']),
    facility: state.getIn(['generator', 'facility']),
    period: state.getIn(['dashboard', 'period'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
