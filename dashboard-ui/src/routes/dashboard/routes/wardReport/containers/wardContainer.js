import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {  } from '../modules/wardModule'
import Layout from '../layouts/wardLayout'

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)