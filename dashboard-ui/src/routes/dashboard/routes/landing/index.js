import React from 'react'
import {Route} from 'react-router'
import LandingLayout from './layouts/landingLayout'
import './landing.css'

const createRoute = () => {
  return (
  	<Route path='/' exact={true} render={(e) => <LandingLayout></LandingLayout>}></Route>
  )
}
export default createRoute
