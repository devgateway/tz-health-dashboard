import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getSearchResults, cleanSearchResults } from '../modules/generatorModule'
import TextSearch from '../components/textSearch'

const mapDispatchToProps = dispatch => bindActionCreators({
	getSearchResults, cleanSearchResults
}, dispatch)

const mapStateToProps = state => {
	return {
		searchResults: state.getIn(['generator', 'searchResults'])
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch)