import React from 'react'
import {translate, Trans} from "react-i18next"
import PropTypes from "prop-types"

class LandingLayout extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
  	  <div className="landing-page">
  	    <div className="landing-title">Data Report Generator</div>
  	    <div className="landing-paragrph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut blandit dui. Vivamus a ligula imperdiet, mollis orci sit amet, viverra quam. Etiam laoreet cursus lacus et eleifend. In hac habitasse platea dictumst. Proin elit risus, varius non accumsan sed, malesuada ut erat. Mauris mollis odio eget dui placerat vehicula.</div>
  	   	<div className="report-options">
  		    <div onClick={e => this.context.router.history.push('/generate/facility')}>
            <div className="facility-icon"></div>
            <div className="option-title">Facility Report Generator</div>
          </div>
  		    <div onClick={e => this.context.router.history.push('/generate/ward')}>
            <div className="ward-icon"></div>
            <div className="option-title">Ward Report Generator</div>
          </div>
  		  </div>
        <div className="info-box">
          <div className="info-icon"></div>
          <div className="info-paragraph">Donec a ultrices mi, quis viverra est. Duis nec nisl justo. Cras maximus nibh at volutpat pretium. Proin rutrum egestas diam vitae sodales. Vestibulum rhoncus a lectus in tempus. </div>
        </div>
  	  </div>
  	)
  }
}

export default translate("translations")(LandingLayout)
