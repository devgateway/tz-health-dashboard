import React from 'react'
import { Route } from 'react-router'
import LandingLayout from './layouts/landingLayout'


const  createRoute=()=>{
  return   (<Route  path='/dashboard/landing' component={LandingLayout}></Route>)
}

export default createRoute
