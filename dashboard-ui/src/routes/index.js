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
    debugger;
    const {store} = this.props
    const i18n=this.context.i18n;
    let updateLanUrl=false;
    let selected;
    const userLanguage=this.context.router.history.location.pathname.substr(1,3);
    if (userLanguage!='en' && userLanguage!='sw'){
      updateLanUrl=true
      selected=i18n.options.fallbackLng[0];
    }else{
      selected=userLanguage;
    }

    //i18n.language

    return (<div>
      <Switch>
        <Redirect exact={true} from="/" to={selected}></Redirect>
        {updateLanUrl?<Redirect exact={true} from="/:lan" to={selected}></Redirect>:null}
      </Switch>
      <Route path="/" render={() => <DashboardRoute store={store}/>}/>
    </div>)
  }
}

const createRoute = (props) => {
    return (<IndexRoute></IndexRoute>)
}

export default createRoute
