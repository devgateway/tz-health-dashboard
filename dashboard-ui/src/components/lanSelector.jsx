import React, {Component} from "react";
import ReactDOM from "react-dom";
import {translate, Trans} from "react-i18next";

class Selector extends Component {

  changeLanguage(e) {
    const { i18n } = this.props;
    i18n.changeLanguage(e.target.value);
  }

  render() {

    const { t, i18n } = this.props;
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };

    return (
      <div>
        <select value={i18n.language} className="" onChange={e => this.changeLanguage(e)} >
          <option value="en"><Trans>English</Trans></option>
          <option value="sw"><Trans>Swahili</Trans></option>
        </select>
      </div>);
  }
}

// extended main view with translate hoc
export default translate("translations")(Selector);
