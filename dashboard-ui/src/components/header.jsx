import React from 'react'

import Selector from './lanSelector'


export default (props) => (
  <div className="header">
    <div className="tz-flag"></div>
    <div className="app-name">Tanzania Health Data Dashboard</div>
    <div className="lang-selector">
      <Selector></Selector>
    </div>
  </div>
)
