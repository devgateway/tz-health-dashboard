import React from 'react'
import PropTypes from 'prop-types'
import Selector from './lanSelector'
import Share from './share.jsx'

export default class Header extends React.Component {
	
	static contextTypes = {
    i18n: PropTypes.object,
    router: PropTypes.object
  }

  render() {
		const lan = this.context.i18n.language
	    
	  return (
	    <div className="header">
	    	<div className="header-link" onClick={e => this.context.router.history.push(`/${lan}`)}>
		      <div className="tz-flag"></div>
		      <div className="app-name">Tanzania Health Data Dashboard</div>
		    </div>
      	<div className="tz-logo"></div>
	      <div className="lang-selector">
	        <Selector/>
	      </div>
	      <div className="share-container">
	      	<Share/>
	      </div>
	    </div>)
	}
}