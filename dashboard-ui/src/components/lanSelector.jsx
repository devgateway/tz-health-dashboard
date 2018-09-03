import React, {Component} from "react";
import ReactDOM from "react-dom";
import {translate, Trans} from "react-i18next";

class Selector extends Component {
  render() {
    const { t, i18n } = this.props;

    const changeLanguage = lng => {
      debugger;
      i18n.changeLanguage(lng);
    };

    return (<div>
        <button onClick={() => changeLanguage("de")}>de</button>
        <button onClick={() => changeLanguage("en")}>en</button>
    </div>);
  }
}

// extended main view with translate hoc
export default translate("translations")(Selector);
