import React, {Component} from "react";
import ReactDOM from "react-dom";
import {translate, Trans} from "react-i18next";
import {push} from 'react-router-redux'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Selector extends Component {

  static contextTypes = {
    i18n: PropTypes.object
  }

  changeLanguage(e) {
    const {i18n} = this.props;
    let current = document.location.hash.substr(1)
    this.props.history.push("/" + e.target.value + current.substr(3))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.lan != this.props.i18n.language) {
      this.props.i18n.changeLanguage(this.props.lan);
    }
  }

  render() {
    const {t, i18n} = this.props;
    let selected;
    if (i18n.language != "sw" && i18n.language != "en") {
      selected = i18n.options.fallbackLng[0];
    } else {
      selected = i18n.language
    }
    return (<div>
      <select className="" value={selected} onChange={e => this.changeLanguage(e)}>
        <option value="en">{t("English")}</option>
        <option value="sw">{t("Swahili")}</option>
      </select>
    </div>);
  }
}

// extended main view with translate hoc
const translated = translate("translations")(Selector);

const mapStateToProps = (state) => {

  return {
    lan: state.getIn(["dashboard", "lan"])
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translated))
