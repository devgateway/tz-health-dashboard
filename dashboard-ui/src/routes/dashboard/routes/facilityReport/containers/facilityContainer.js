import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getFacilityInfo } from '../modules/facilityModule'
import Layout from '../layouts/facilityLayout'

const mapDispatchToProps = dispatch => bindActionCreators({
	onGetFacilityInfo: getFacilityInfo
}, dispatch)

const mapStateToProps = state => {
  return {
  	mapShape: state.getIn(['facility', 'reportData', 'map', 'shape']).toJS(),
  	mapPoints: state.getIn(['facility', 'reportData', 'map', 'points']).toJS(),
  	mainInfo: state.getIn(['facility', 'reportData', 'main']).toJS(),
  	populationInfo: state.getIn(['facility', 'reportData', 'population']).toJS(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)