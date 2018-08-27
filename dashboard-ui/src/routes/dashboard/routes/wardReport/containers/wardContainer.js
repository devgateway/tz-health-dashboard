import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getWardInfo } from '../modules/wardModule'
import {CATEGORY_WARD, CATEGORY_DISTRICT} from '../../../modules/dashboard'
import Layout from '../layouts/wardLayout'

const mapDispatchToProps = dispatch => bindActionCreators({
	onGetWardInfo: getWardInfo,
}, dispatch)

const mapStateToProps = state => {
	return {
		wardFeature: state.getIn(['dashboard', CATEGORY_WARD, 'selected']),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)