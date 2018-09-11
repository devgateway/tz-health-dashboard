import React, {Component} from "react";
import ReactDOM from "react-dom";
import {translate, Trans} from "react-i18next";

class Selector extends Component {
  render() {

    const { t, i18n } = this.props;

    const changeLanguage = lng => {

      i18n.changeLanguage(lng);
    };

    return (
      <div>
          <button onClick={() => changeLanguage("sw")}><Trans>Swahili</Trans></button>
          <button onClick={() => changeLanguage("en")}><Trans>English</Trans></button>
      </div>);
  }
}

// extended main view with translate hoc
export default translate("translations")(Selector);
