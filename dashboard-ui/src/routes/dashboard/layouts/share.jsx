import React from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {translate, Trans} from "react-i18next";
import './share.css'
class ShareLink extends React.Component {

  open(e) {
      debugger;
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

    const {className, href, title}=this.props

    const target=document.location.href
    const url=href+encodeURIComponent(target)

    return (<a class={"shareLink "+className} onClick={this.open} href={url} title={title} target="_blank"></a>)
  }
}

export default class Share extends React.Component {

  /* ================================================== */

  render() {
    return <div className="share-buttons" id="share-buttons">

      <ShareLink className="facebook" href="http://www.facebook.com/sharer.php?u="  title="Facebook"></ShareLink>
      <ShareLink className="gplus" href="https://plus.google.com/share?url="  title="Google +"></ShareLink>
      <ShareLink className="in" href="http://www.linkedin.com/shareArticle?mini=true&amp;url="  title="Linked in"></ShareLink>
      <ShareLink className="twitter" href="https://twitter.com/share?url=" title="Twitter"></ShareLink>
      <ShareLink className="vk" href="http://vkontakte.ru/share.php?url=" title="VK"></ShareLink>


    </div>
  }
}
