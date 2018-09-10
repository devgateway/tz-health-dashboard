import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getFacilityInfo, getFacilityPopulation, getFacilityDiagnoses, getMapShape, getMapPoints } from '../modules/facilityModule'
import Layout from '../layouts/facilityLayout'

const mapDispatchToProps = dispatch => bindActionCreators({
  onGetFacilityInfo: getFacilityInfo,
  onGetFacilityPopulation: getFacilityPopulation,
  onGetFacilityDiagnoses: getFacilityDiagnoses,
  onGetMapPoints: getMapPoints,
  onGetMapShape: getMapShape,
}, dispatch)

const mapStateToProps = state => {
  debugger;

  return {
    mapShape: state.getIn(['facility', 'reportData', 'map', 'shape']),
    mapPoints: state.getIn(['facility', 'reportData', 'map', 'points']),
    info: state.getIn(['facility', 'reportData', 'info']),
    population: state.getIn(['facility', 'reportData', 'population']),
    diagnoses: state.getIn(['facility', 'reportData', 'diagnoses']),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
