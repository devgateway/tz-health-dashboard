import React from 'react'
import {injectReducer} from '../../../../store/store'
import {asyncComponent} from 'react-async-component'

const createRoute = (props) => {
  const {store} = props

  const WardComponent = asyncComponent({
    resolve: (props) => new Promise(resolve => require.ensure([], (require) => {
      const reducer = require('./modules/wardModule').default
      injectReducer({key: 'ward', reducer}) // inject reducer
      const view = require('./containers/wardContainer').default
      resolve(view);
    }, 'dash-chunk'))
  })

  return (<WardComponent ></WardComponent>)
}

export default createRoute
