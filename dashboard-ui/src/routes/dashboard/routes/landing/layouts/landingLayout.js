import React from 'react'
import Map from '../components/landingMaps.jsx'
import {translate, Trans} from "react-i18next";

const component= (props) =>(
  <div>
    <h2><Trans>Map</Trans></h2>
    <Map></Map>
  </div>
)

export default translate("translations")(component)
