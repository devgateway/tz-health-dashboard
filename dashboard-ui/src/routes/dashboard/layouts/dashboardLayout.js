import React from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {translate, Trans} from "react-i18next";
import Share from './share.jsx'
const component = (props) => {
  return (
    <div className="dashboard">
      <div><Share></Share></div>
      {props.children}
    </div>)
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(translate("translations")(component))
