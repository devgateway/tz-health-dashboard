import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getFacilityInfo } from '../modules/facilityModule'
import Layout from '../layouts/facilityLayout'

const mapDispatchToProps = dispatch => bindActionCreators({
	onGetFacilityInfo: getFacilityInfo
}, dispatch)

const mapStateToProps = state => {
  return {
  	data: state.getIn(['data'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)