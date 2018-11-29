import React from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {translate, Trans} from "react-i18next";
import './share.css'


function copyToClipboard(text) {

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
class CopyLinkButton extends React.Component {

  constructor(name) {
    super()
    this.state = {
      showLink: false
    }
    this.onClick = this.onClick.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
  }

  onClick() {
    copyToClipboard(document.location.href);
    this.setState({showLink: true})
    window.setTimeout((e)=>{
      this.setState({showLink:false,hover:false})
    },1000)
  }


  onMouseOver(){
    this.setState({showLink: this.state.showLink,hover:true})
  }

  onMouseOut(){
    this.setState({showLink: this.state.showLink,hover:false})
  }

  render() {
    const {showLink,hover} = this.state
    const classs=(showLink)?"copied":(hover)?"hover":"normal";

    return (<div className={"copy-link-button "+classs} onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
      <div className="container">
        <span className="normal">COPY</span>
        <span className="hover">CLICK</span>
        <span className="copied">DONE</span>
      </div>
    </div>)
  }
}

class ShareLink extends React.Component {

  open(e) {

    e.preventDefault();
    // Set values for window
    let intWidth = '500';
    let intHeight = '400';
    let strResize = 'no';

    var strTitle = arguments[0].target.title,
      strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
      objWindow = window.open(arguments[0].target.href, strTitle, strParam).focus();
  }

  render() {

    const {className, href, title} = this.props

    const target = document.location.href
    const url = href + encodeURIComponent(target)

    return (<a className={"shareLink " + className} onClick={this.open} href={url} title={title} target="_blank"></a>)
  }
}

export default class Share extends React.Component {

  /* ================================================== */

  render() {
    return <div className="share-buttons" id="share-buttons">

      <ShareLink className="facebook" href="http://www.facebook.com/sharer.php?u=" title="Facebook"></ShareLink>
      <ShareLink className="gplus" href="https://plus.google.com/share?url=" title="Google +"></ShareLink>
      <ShareLink className="twitter" href="https://twitter.com/share?url=" title="Twitter"></ShareLink>
      {/*<CopyLinkButton>Copy Link</CopyLinkButton>*/}

    </div>
  }
}
