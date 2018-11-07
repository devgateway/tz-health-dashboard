import React from 'react'
import {Route, Redirect,Switch} from 'react-router'
import Routes from './routes'
import {injectReducer} from '../../store/store'
import {asyncComponent} from 'react-async-component'
import './dashboard.css'

const DashboardComponent = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], (require) => {
    const reducer = require('./modules/dashboard').default;
    const view = require('./layouts/dashboardLayout').default
    injectReducer({key: 'dashboard', reducer}); // inject reducer
    resolve(view);
  }, 'dash-chunk'))
})

const createRoute = (props) => {
  return (
    <div>
      <Route path="/:locale" render={(e)=>{
        return (
          <DashboardComponent>
            <Routes {...props}/>

            </DashboardComponent>
        )}}>
      </Route>
    </div>
  )
}

export default createRoute
