import React from 'react'
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {translate, Trans} from "react-i18next";

const component = (props) => {
  return (
    <div className="dashboard">
	    {props.children}
	</div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(translate("translations")(component))
