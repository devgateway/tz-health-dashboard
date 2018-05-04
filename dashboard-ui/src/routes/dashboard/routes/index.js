import React from 'react'
import {Route, Redirect} from 'react-router'

import {asyncComponent} from 'react-async-component';
import LandingRoute from './landing'
import FacilitiesRoute from './facilities'

const createRoute = () => {
  return (<div>
            <LandingRoute></LandingRoute>
            <FacilitiesRoute></FacilitiesRoute>
        </div>
  )
}

export default createRoute
