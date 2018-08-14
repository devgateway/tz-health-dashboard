import React from 'react'
import {injectReducer} from '../../../../store/store'
import {asyncComponent} from 'react-async-component'
import './wardReport.css'

const createRoute = (props) => {
  const {store, params} = props
  const WardComponent = asyncComponent({
    resolve: (props) => new Promise(resolve => require.ensure([], (require) => {
      const reducer = require('./modules/wardModule').default
      injectReducer({key: 'ward', reducer}) // inject reducer
      const view = require('./containers/wardContainer').default
      resolve(view);
    }, 'dash-chunk'))
  })

  return (<WardComponent params={params}></WardComponent>)
}

export default createRoute
