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
  	    <div className="landing-paragrph">This dashboard visualizes key information from Tanzania’s health information management system, dhis2. You can explore and download subnational data on service populations; out-patient diseases; reproductive, maternal, newborn, and child health; health financing; staffing; and community deaths. Use the buttons below to dive deeper into the data, by either an individual facility or ward.</div>
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
          <div className="info-paragraph">This portal is managed by the President’s Office - Regional Administration and Local Government (PORALG), in partnership with the Ministry of Health, Community Development, Gender, Elderly and Children (MoHCDGEC). Development Gateway developed the dashboard, with financial support from the Bill & Melinda Gates Foundation and technical support from DataVision International.</div>
        </div>
  	  </div>
  	)
  }
}

export default translate("translations")(LandingLayout)
