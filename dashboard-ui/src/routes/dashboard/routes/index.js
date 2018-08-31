import React from 'react'
import {Redirect, Switch} from 'react-router'
import {Route} from 'react-router-dom'

import {asyncComponent} from 'react-async-component';
import ReportRoute from './report'
import Landing from './landing'

const createRoute = (props) => {
  const {store} = props
  return (
    <div>
      <Route path="/dashboard/landing" render={() => <Landing store={store}/>}/>
      <ReportRoute store={store}/>
    </div>
  )
}

export default createRoute
