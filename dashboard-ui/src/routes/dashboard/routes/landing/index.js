import React from 'react'
import { Route } from 'react-router'
import LandingLayout from './layouts/landingLayout'
import './landing.css'

const  createRoute=()=>{
  return   (<Route  path='/dashboard/landing' component={LandingLayout}></Route>)
}

export default createRoute
