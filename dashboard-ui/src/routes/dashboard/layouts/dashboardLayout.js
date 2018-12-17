import React from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {translate, Trans} from "react-i18next";
import {getConfiguration} from '../modules/dashboard'
class DashboardLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    this.props.onLoad();
  }

  render() {
    return (<div className="dashboard">
      {this.props.children}
    </div>)
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/about-us'),
    onLoad:getConfiguration
}, dispatch)

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(translate("translations")(DashboardLayout))
