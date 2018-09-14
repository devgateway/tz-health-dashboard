import React from 'react'
import {Redirect, Switch} from 'react-router'
import {Route} from 'react-router-dom'

import {asyncComponent} from 'react-async-component';
import ReportRoute from './report'
import LandingRoute from './landing'
import GeneratorRoute from './generator'

const createRoute = (props) => {
  const {store} = props
  return (
    <div>
      <LandingRoute store={store}/>
      <ReportRoute store={store}/>
      <GeneratorRoute store={store}/>
    </div>
  )
}

export default createRoute
