import React, {Component} from "react";
import ReactDOM from "react-dom";
import {translate, Trans} from "react-i18next";

class Selector extends Component {
  render() {
    debugger;
    const { t, i18n } = this.props;

    const changeLanguage = lng => {
    debugger;
      i18n.changeLanguage(lng);
    };

    return (
      <div>
          <button onClick={() => changeLanguage("sw")}><trans>Swahili</trans></button>
          <button onClick={() => changeLanguage("en")}><trans>English</trans></button>
      </div>);
  }
}

// extended main view with translate hoc
export default translate("translations")(Selector);
