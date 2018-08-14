import React from 'react'
import {Redirect, Switch} from 'react-router'
import {Route} from 'react-router-dom'

import {asyncComponent} from 'react-async-component';
import FacilityRoute from './facilityReport'
import WardRoute from './wardReport'
import Landing from './landing'

const createRoute = (props) => {
  const {store} = props
  return (
    <div>
      <Route path="/dashboard/landing" render={() => <Landing store={store}/>}/>
      <Route path="/facilityReport/:id/:period" render={({ match }) => <FacilityRoute params={match.params} store={store}/>}/>
      <Route path="/wardReport/:id/:period" render={({ match }) => <WardRoute params={match.params} store={store}/>}/>
    </div>
  )
}

export default createRoute
