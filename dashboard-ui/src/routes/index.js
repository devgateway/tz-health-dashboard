import React from 'react'
import { Route,Redirect ,Switch} from 'react-router'
import DashboardRoute from './dashboard/'
import ReportsRoute from './reports/index.js'
import './app.css'
    //example at this level can be an admin route or report route
const  createRoute=()=>{
  return   (
    <Route paht="/">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard/landing" />} />
         <DashboardRoute></DashboardRoute>
         <ReportsRoute></ReportsRoute>
      </Switch>

    </Route>)
}

export default createRoute
