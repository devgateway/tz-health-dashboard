import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import './textSearch.css'
import {translate, Trans} from "react-i18next"
import i18n from '../../../../../i18n'

class TextSearch extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor() {
    super();

    this.state = {
      value: '',
      inputTitle: null,
      selection: {}
    };
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  onCleanSelection() {
    this.setState({value: ''})
    this.setState({inputTitle: null})
  }

  onChange(event, { newValue, method }) {
    this.setState({value: newValue.split(' (')[0]})
    this.setState({inputTitle: newValue})
    this.setState({
      suggestions: []
    })
  }

  onSuggestionsFetchRequested({ value }) {
    const {getFacilitySearchResults, getWardSearchResults, searchType} = this.props
  	if (value.length > 3) {
      if (searchType === 'ward') {
        getWardSearchResults(value)
      } else {
        getFacilitySearchResults(value)
      }
	  }
  }

  onSuggestionsClearRequested(suggestion) {
  	this.props.cleanSearchResults(this.props.searchType)
  }

  getSuggestionValue(suggestion) {
    const { searchType, onSelection } = this.props
    this.setState({selection: suggestion})
    onSelection(suggestion)
    if (searchType === 'ward') {
      return `${suggestion.name} (Region: ${suggestion.region ? suggestion.region.name : 'Unknown'} - District: ${suggestion.district ? suggestion.district.name : 'Unknown'})`
    } else {
      return `${suggestion.name} (Region: ${suggestion.region ? suggestion.region.name : 'Unknown'} - District: ${suggestion.district ? suggestion.district.name : 'Unknown'} - Ward: ${suggestion.ward ? suggestion.ward.name : 'Unknown'})`
    }
  }

  renderSuggestion(suggestion, { query }) {
    const { searchType } = this.props
    const suggestionText = `${suggestion.name}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className="">
        <span className="name">
          {parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;
            return (<span className={className} key={index}>{part.text}</span>)
          })}
        </span>
        <span className="name">
          {searchType === 'ward' ?
            <i>{`(Region: ${suggestion.region ? suggestion.region.name : 'Unknown'} - District: ${suggestion.district ? suggestion.district.name : 'Unknown'} )`}</i>
          :
            <i>{`(Region: ${suggestion.region ? suggestion.region.name : 'Unknown'} - District: ${suggestion.district ? suggestion.district.name : 'Unknown'} - Ward: ${suggestion.ward ? suggestion.ward.name : 'Unknown'})`}</i>
          }
        </span>
      </span>
    );
  }

  onGenerateReport() {
    const lan= this.props.i18n.language
    const { searchType } = this.props
    const { selection } = this.state;
    if (searchType === 'ward') {
      this.context.router.history.push(`/${lan}/report/ward/${selection.gid}`)
    } else {
      this.context.router.history.push(`/${lan}/report/facility/${selection.id}`)
    }
  }

  render() {
    const { value, selection, inputTitle } = this.state;
    const { searchType, searchResults } = this.props
    const suggestions = searchResults.getIn([searchType, 'list']).toJS()
    const inputProps = {
      placeholder: i18n.t('Search by name'),
      value,
      onChange: this.onChange.bind(this),
    }

    return (
      <div className="text-search-container">
        <div className={`search-type-${searchType}`}>
          <Trans>{`${searchType} search`}</Trans>
        </div>
        <div title={inputTitle}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
            getSuggestionValue={this.getSuggestionValue.bind(this)}
            renderSuggestion={this.renderSuggestion.bind(this)}
            inputProps={inputProps} />
        </div>
      </div>
    )
  }
}

export default translate("translations")(TextSearch)
