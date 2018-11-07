import React, {Component} from "react";
import ReactDOM from "react-dom";
import {translate, Trans} from "react-i18next";
import {push} from 'react-router-redux'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Selector extends Component {

  static contextTypes = {
    router: PropTypes.object,
    i18n: PropTypes.object,
  }

  changeLanguage(e) {
    const {i18n} = this.props;
    let current = this.context.router.route.location.pathname;
    this.context.router.history.push("/" + e.target.value + current.substr(3))
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.lan!=this.props.i18n.language){
       this.props.i18n.changeLanguage(this.props.lan);
    }
  }

  render() {
    const {t, i18n} = this.props;

    return (<div>
      <select className="" value={i18n.language} onChange={e => this.changeLanguage(e)}>
        <option value="en">{t("English")}</option>
        <option value="sw">{t("Swahili")}</option>
      </select>
    </div>);
  }
}

// extended main view with translate hoc
const translated = translate("translations")(Selector);

const mapStateToProps = (state) => {
  debugger;
  return {lan:state.getIn(["dashboard","lan"])}
}
const mapDispatchToProps = (dispatch, props) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(translated)
