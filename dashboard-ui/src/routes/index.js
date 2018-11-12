import React, {Component} from "react";
import {Route, Redirect, Switch} from 'react-router'
import DashboardRoute from './dashboard/'
import './app.css'
//example at this level can be an admin route or report route
import PropTypes from 'prop-types';

class IndexRoute extends Component {
  static contextTypes = {
    router: PropTypes.object,
    i18n: PropTypes.object
  }

  render() {

    const {store} = this.props
    return (<div>
      <Switch>
        <Redirect exact={true} from="/" to={this.context.i18n.language}></Redirect>
      </Switch>
      <Route path="/" render={() => <DashboardRoute store={store}/>}/>
    </div>)
  }
}

const createRoute = (props) => {
    return (<IndexRoute></IndexRoute>)
}

export default createRoute
