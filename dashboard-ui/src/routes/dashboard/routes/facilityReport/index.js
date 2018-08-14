import React from 'react'
import {injectReducer} from '../../../../store/store'
import {asyncComponent} from 'react-async-component'
import './facilityReport.css'

const createRoute = (props) => {
  const {store, params} = props
  const FacilityComponent = asyncComponent({
    resolve: (props) => new Promise(resolve => require.ensure([], (require) => {
      const reducer = require('./modules/facilityModule').default
      injectReducer({key: 'facility', reducer}) // inject reducer
      const view = require('./containers/facilityContainer').default
      resolve(view);
    }, 'dash-chunk'))
  })

  return (<FacilityComponent params={params}></FacilityComponent>)
}

export default createRoute
