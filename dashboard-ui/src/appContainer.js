import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Routes from './routes'
import DefaultLayout from './layouts/defaultLayout'

class AppContainer extends React.Component {
  
  render () {
    const {history,store} = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
            <DefaultLayout>
              <Routes {...this.props}></Routes>
            </DefaultLayout>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default AppContainer;
