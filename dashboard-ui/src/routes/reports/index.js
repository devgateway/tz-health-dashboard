import React from 'react'
import { Route} from 'react-router'


import { asyncComponent } from 'react-async-component';

const ReportsComponent = asyncComponent({
  resolve: () => new Promise(resolve =>
    require.ensure([], (require) => {
      resolve(require('./components/reports.js'));
    }, 'dash-chunk')
  )
})



const createRoute = () => {
    return ( <Route component = {ReportsComponent} path='/reports'/>)}

    export default createRoute
