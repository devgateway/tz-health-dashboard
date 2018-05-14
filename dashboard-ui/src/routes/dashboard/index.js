import React from 'react'
import {Route, Redirect} from 'react-router'

import Routes from './routes'
import {injectReducer} from '../../store/store'
import {asyncComponent} from 'react-async-component';

const DashboardComponent = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], (require) => {

    const reducer = require('./modules/dashboard').default;
    const view = require('./layouts/dashboardLayout').default
    injectReducer({key: 'dashboard', reducer}); // inject reducer

    resolve(view);
  }, 'dash-chunk'))
})

const createRoute = (props) => {
  return (<div>
    <Route component={DashboardComponent} path='/dashboard'/>
    <Routes></Routes>

  </div>)

}

export default createRoute
