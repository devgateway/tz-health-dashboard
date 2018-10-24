import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import './textSearch.css'
import {translate, Trans} from "react-i18next"

class TextSearch extends React.Component {
  
  static contextTypes = {
    router: PropTypes.object
  }

  constructor() {
    super();

    this.state = {
      value: '',
      selection: {}
    };    
  }

  onChange(event, { newValue, method }) {
    this.setState({value: newValue})
  }
  
  onSuggestionsFetchRequested({ value }) {
  	if (value.length > 3) {
	  	this.props.getSearchResults(this.props.searchType, {'keyWord': value})
	  }
  };

  onSuggestionsClearRequested(suggestion) {
  	this.props.cleanSearchResults(this.props.searchType)
  }

  getSuggestionValue(suggestion) {
    this.setState({selection: suggestion})
    return `${suggestion.name} (Ward: ${suggestion.ward ? suggestion.ward.name : 'Unknown'})`;
  }

  renderSuggestion(suggestion, { query }) {
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
          {` (Ward: ${suggestion.ward ? suggestion.ward.name : 'Unknown'})`}
        </span>
      </span>
    );
  }

  onGenerateReport() {
    const { searchType } = this.props
    const { selection } = this.state;
    if (searchType === 'ward') {
      this.context.router.history.push(`/report/ward/${selection.id}`)
    } else {
      this.context.router.history.push(`/report/facility/${selection.id}`)
    }
  }

  render() {
    const { value, selection } = this.state;
    const { searchType, searchResults } = this.props
    const suggestions = searchResults.getIn([searchType, 'list']).toJS()
    const inputProps = {
      placeholder: "Search by name",
      value,
      onChange: this.onChange.bind(this),
    }

    return (
      <div className="text-search-container">
        <div className={`search-type-${searchType}`}>
          {`${searchType} search`}
        </div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          getSuggestionValue={this.getSuggestionValue.bind(this)}
          renderSuggestion={this.renderSuggestion.bind(this)}
          inputProps={inputProps} />
        {selection.id ?
          <div className="generate-button" onClick={e => this.onGenerateReport()}><Trans>Generate Report</Trans></div>
        :
          <div className="generate-button-disabled"><Trans>Generate Report</Trans></div>
        }  
      </div>
    )
  }
}

export default translate("translations")(TextSearch)
