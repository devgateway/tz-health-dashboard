import React from 'react'
import PropTypes from "prop-types"
import {translate, Trans} from "react-i18next"
import i18n from '../../../../../i18n'
import {withRouter} from 'react-router-dom';

class Back extends React.Component {
  onClick() {
    const lan = this.props.i18n.language
    const reportType = document.location.hash.split("/")[3]
    this.props.history.push(`/${lan}/generate/${reportType}`)
  }
  render() {
    return (<div title={`${i18n.t('Back to gegenerator')}`} className="backButton" onClick={e => this.onClick()}></div>)
  }
}
export default translate("translations")(withRouter(Back))
