import React from 'react'
import { Route,Redirect } from 'react-router'
import DashboardRoute from './dashboard/'
import ReportsRoute from './reports/index.js'

    //example at this level can be an admin route or report route
const  createRoute=()=>{
  return   (
    <Route paht="/">
      <div className='app'>

         <DashboardRoute></DashboardRoute>
         <ReportsRoute></ReportsRoute>
          <Redirect from="/" to="/dashboard/landing"></Redirect>
      </div>
    </Route>)
}

export default createRoute
