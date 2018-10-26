import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getFacilitySearchResults, getWardSearchResults, cleanSearchResults } from '../modules/generatorModule'
import TextSearch from '../components/textSearch'

const mapDispatchToProps = dispatch => bindActionCreators({
	getFacilitySearchResults, getWardSearchResults, cleanSearchResults
}, dispatch)

const mapStateToProps = state => {
	return {
		searchResults: state.getIn(['generator', 'searchResults'])
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch)