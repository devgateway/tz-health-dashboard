import React from 'react'
import {render} from 'react-dom'
import AppContainer from './appContainer'
import './index.css'
import store, {history} from './store/store'
const routes = require('./routes/index').default(store);

render(<AppContainer routes={routes} store={store} history={history}></AppContainer>, document.querySelector('#root'))
