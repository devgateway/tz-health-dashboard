import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getWardInfo, getWardPopulation, getWardDiagnoses, getMapShape, getMapPoints ,getWardRMNCH} from '../modules/wardModule'
import Layout from '../layouts/wardLayout'

const mapDispatchToProps = dispatch => bindActionCreators({
  onGetWardInfo: getWardInfo,
  onGetWardPopulation: getWardPopulation,
  onGetWardDiagnoses: getWardDiagnoses,
  onGetWardRMNCH:getWardRMNCH,
  onGetMapPoints: getMapPoints,
  onGetMapShape: getMapShape,
}, dispatch)

const mapStateToProps = state => {

  return {
    mapShape: state.getIn(['ward', 'reportData', 'map', 'shape']),
    mapPoints: state.getIn(['ward', 'reportData', 'map', 'points']),
    info: state.getIn(['ward', 'reportData', 'info']),
    population: state.getIn(['ward', 'reportData', 'population']),
    diagnoses: state.getIn(['ward', 'reportData', 'diagnoses']),
    RMNCH: state.getIn(['ward', 'reportData', 'RMNCH']),
    period: state.getIn(['dashboard', 'period']),
    conf:state.getIn(['dashboard','conf'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
