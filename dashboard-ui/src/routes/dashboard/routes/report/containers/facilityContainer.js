import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getFacilityInfo, getFacilityPopulation, getFacilityDiagnoses, getMapShape, getMapPoints ,getFacilityRMNCH, setOPDView, setRMNCHView} from '../modules/facilityModule'
import Layout from '../layouts/facilityLayout'

const mapDispatchToProps = dispatch => bindActionCreators({
  onGetFacilityInfo: getFacilityInfo,
  onGetFacilityPopulation: getFacilityPopulation,
  onGetFacilityDiagnoses: getFacilityDiagnoses,
  onGetFacilityRMNCH:getFacilityRMNCH,
  onGetMapPoints: getMapPoints,
  onGetMapShape: getMapShape,
  onSetOPDView: setOPDView,
  onSetRMNCHView: setRMNCHView
}, dispatch)

const mapStateToProps = state => {
  return {
    mapRegion: state.getIn(['facility', 'reportData', 'map', 'region']),
    mapShape: state.getIn(['facility', 'reportData', 'map', 'shape']),
    mapPoints: state.getIn(['facility', 'reportData', 'map', 'points']),
    info: state.getIn(['facility', 'reportData', 'info']),
    population: state.getIn(['facility', 'reportData', 'population']),
    diagnoses: state.getIn(['facility', 'reportData', 'diagnoses']),
    RMNCH: state.getIn(['facility', 'reportData', 'RMNCH']),
    period: state.getIn(['dashboard', 'period']),
    OPDView: state.getIn(['facility', 'OPDView']),
    RMNCHView: state.getIn(['facility', 'RMNCHView']),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
