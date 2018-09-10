import React from 'react'
import { Route,Redirect ,Switch} from 'react-router'
import DashboardRoute from './dashboard/'
import './app.css'
    //example at this level can be an admin route or report route

const createRoute = (props) => {
  const {store} = props
  return (
  	<div>
      <i>Root /</i>
      <Route path="/" render={() => <DashboardRoute store={store}/>} />
    </div>
  )
}

export default createRoute
