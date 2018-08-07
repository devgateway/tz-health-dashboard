import React from 'react'
import {injectReducer} from '../../../../store/store'
import {asyncComponent} from 'react-async-component'

const createRoute = (props) => {
  const {store} = props

  const FacilityComponent = asyncComponent({
    resolve: (props) => new Promise(resolve => require.ensure([], (require) => {
      const reducer = require('./modules/facilityModule').default
      injectReducer({key: 'facility', reducer}) // inject reducer
      const view = require('./containers/facilityContainer').default
      resolve(view);
    }, 'dash-chunk'))
  })

  return (<FacilityComponent ></FacilityComponent>)
}

export default createRoute
