import React from 'react'
//import Map from '../components/landingMaps.jsx'
import {translate, Trans} from "react-i18next";
import {Link} from 'react-router-dom'

const component= (props) =>(
  <div>
    <h2><Trans>Landing Page</Trans></h2>
    <div><Link to='/generate/facility'>Facility Report Generator</Link></div>
    <div><Link to='/generate/ward'>Ward Report Generator</Link></div>
  </div>
)

export default translate("translations")(component)
