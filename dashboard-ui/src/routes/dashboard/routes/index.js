import React from 'react'
import {Route, Redirect,Switch} from 'react-router'

import {asyncComponent} from 'react-async-component';
import FacilityRoute from './facilityReport'
import WardRoute from './facilityReport'

const createRoute = (props) => {
  const {store} = props
  return (
    <div>
      <Route path="/facilityReport" render={() => <FacilityRoute store={store}/>}/>
      <Route path="/wardReport" render={() => <WardRoute store={store}/>}/>
    </div>
  )
}

export default createRoute
