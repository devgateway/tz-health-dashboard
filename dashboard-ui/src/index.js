import React from 'react'
import {render} from 'react-dom'
import AppContainer from './appContainer'
import './index.css'
import store, {history} from './store/store'
const routes = require('./routes/index').default(store);
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n";

render(
  <I18nextProvider i18n={i18n}>
    <AppContainer routes={routes} store={store} history={history}></AppContainer>
  </I18nextProvider>, document.querySelector('#root'))
