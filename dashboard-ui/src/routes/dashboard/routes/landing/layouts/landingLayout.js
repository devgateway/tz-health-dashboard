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

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

    const lan= this.props.i18n.language

    return(
  	  <div class="landing-page-wrapper">
      <div className="landing-page">
  	    <div className="landing-title"><Trans>Data Report Generator</Trans></div>
  	    <div className="landing-paragrph"><Trans>Landing description</Trans></div>
  	   	<div className="report-options">
        <div className="button-description"><Trans>Use the buttons below</Trans></div>
  		    <div onClick={e => this.context.router.history.push(`${lan}/generate/facility`)} className="report-box first">
            <div className="facility-icon"></div>
            <div className="">
              <div className="option-title"><Trans>Facility Report Generator</Trans></div>
              <div className="option-paragraph"><Trans>Facility Report Description</Trans></div>
            </div>
          </div>
          <div onClick={e => this.context.router.history.push(`${lan}/generate/ward`)} className="report-box">
            <div className="ward-icon"></div>
            <div>
              <div className="option-title"><Trans>Ward Report Generator</Trans></div>
              <div className="option-paragraph"><Trans>Ward Report Description</Trans></div>
            </div>
          </div>
  		  </div>
        <div className="info-box">
          <div className="info-icon"></div>
          <div className="info-paragraph"><Trans>This portal is managed by the President’s Office - Regional Administration and Local Government (PORALG), in partnership with the Ministry of Health, Community Development, Gender, Elderly and Children (MoHCDGEC). Development Gateway developed the dashboard, with financial support from the Bill & Melinda Gates Foundation and technical support from DataVision International.</Trans></div>
        </div>
  	  </div>
      </div>
  	)
  }
}

export default translate("translations")(LandingLayout)
