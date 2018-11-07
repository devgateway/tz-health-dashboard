import React from 'react'
import {injectReducer} from '../../../../store/store'
import {asyncComponent} from 'react-async-component'
import {Route} from 'react-router-dom'
import './report.css'

const createRoute = (props) => {
  const {store, params} = props
  const FacilityReport = asyncComponent({
    resolve: (props) => new Promise(resolve => require.ensure([], (require) => {
      const reducer = require('./modules/facilityModule').default
      injectReducer({key: 'facility', reducer}) // inject reducer
      const view = require('./containers/facilityContainer').default
      resolve(view);
    }, 'dash-chunk'))
  })

  const WardReport = asyncComponent({
    resolve: (props) => new Promise(resolve => require.ensure([], (require) => {
      const reducer = require('./modules/wardModule').default
      injectReducer({key: 'ward', reducer}) // inject reducer
      const view = require('./containers/wardContainer').default
      resolve(view);
    }, 'dash-chunk'))
  })

  return (<div>
    <Route path="/:locale/report/facility/:id/:period?" render={({match}) => <FacilityReport store={store} params={match.params}/>}/>
    <Route path="/:locale/report/ward/:id/:period?" render={({match}) => <WardReport store={store} params={match.params}/>}/>
  </div>)
}

export default createRoute
