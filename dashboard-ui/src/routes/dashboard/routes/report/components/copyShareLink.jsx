import React from 'react'
import PropTypes from "prop-types"
import {translate, Trans} from "react-i18next"
import i18n from '../../../../../i18n'

class ShareCopy extends React.Component {

  constructor() {
    super()
    this.state = {
      copied: false
    }
  }

  onClick() {
    this.copyToClipboard(document.location.href);
    this.setState({copied: true})
    window.setTimeout((e)=>{
      this.setState({copied: false})
    },2000)
  }

  copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
  }

  render() {
    const {copied} = this.state
    const cls = copied ? 'copied': '';

    return (
      <div title={`${i18n.t('Copy link to share')}`} className={`copy-link-icon ${cls}`} onClick={e => this.onClick()}></div>
    )
  }
}

export default translate("translations")(ShareCopy)
