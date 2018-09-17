import React from 'react'
import {injectReducer} from '../../../../store/store'
import {asyncComponent} from 'react-async-component'
import {Route} from 'react-router-dom'
import './generator.css'

const createRoute = (props) => {
  const {store, params} = props
  const ReportGenerator = asyncComponent({
    resolve: (props) => new Promise(resolve => require.ensure([], (require) => {
      const reducer = require('./modules/generatorModule').default
      injectReducer({key: 'generator', reducer}) // inject reducer
      const view = require('./containers/generatorContainer').default
      resolve(view);
    }, 'dash-chunk'))
  })

  
  return (
    <div>
      <Route path="/generate/:reportType" render={({match}) => <ReportGenerator store={store} params={match.params}/>}/>
    </div>
  )
}

export default createRoute
