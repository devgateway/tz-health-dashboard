import React from 'react'
import { Route } from 'react-router'
import FacilitiesLayout from './layouts/facilitiesLayout'
const  createRoute=()=>{
  return   (<Route  path='/dashboard/facilities' component={FacilitiesLayout}/>)
}

export default createRoute
