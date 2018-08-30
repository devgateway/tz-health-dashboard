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
  return {
  	mapShape: state.getIn(['facility', 'reportData', 'map', 'shape']).toJS(),
  	mapPoints: state.getIn(['facility', 'reportData', 'map', 'points']).toJS(),
  	info: state.getIn(['facility', 'reportData', 'info']).toJS(),
  	population: state.getIn(['facility', 'reportData', 'population']).toJS(),
  	diagnoses: state.getIn(['facility', 'reportData', 'diagnoses']).toJS(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)