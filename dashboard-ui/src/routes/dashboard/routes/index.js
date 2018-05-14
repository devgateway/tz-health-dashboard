import React from 'react'
import {Route, Redirect,Switch} from 'react-router'

import {asyncComponent} from 'react-async-component';
import LandingRoute from './landing'
import FacilitiesRoute from './facilities'

const createRoute = () => {
  return (<Switch>
            <LandingRoute></LandingRoute>
            <FacilitiesRoute></FacilitiesRoute>
        </Switch>
  )
}

export default createRoute
