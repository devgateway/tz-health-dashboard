import Immutable from 'immutable';
import * as api from '../../../../../api'

// ------------------------------------ Constants ------------------------------------
const FACILITY_INFO_REQUEST = 'FACILITY_INFO_REQUEST'
const FACILITY_INFO_RESPONSE = 'FACILITY_INFO_RESPONSE'
const FACILITY_INFO_ERROR = 'FACILITY_INFO_ERROR'
const FACILITY_POPULATION_REQUEST = 'FACILITY_POPULATION_REQUEST'
const FACILITY_POPULATION_RESPONSE = 'FACILITY_POPULATION_RESPONSE'
const FACILITY_POPULATION_ERROR = 'FACILITY_POPULATION_ERROR'

const FACILITY_DIAGNOSES_REQUEST = 'FACILITY_DIAGNOSES_REQUEST'
const FACILITY_DIAGNOSES_RESPONSE = 'FACILITY_DIAGNOSES_RESPONSE'
const FACILITY_DIAGNOSES_ERROR = 'FACILITY_DIAGNOSES_ERROR'

const FACILITY_MAP_REQUEST = 'FACILITY_MAP_SHAPE_REQUEST'
const FACILITY_MAP_SHAPE_RESPONSE = 'FACILITY_MAP_SHAPE_RESPONSE'
const FACILITY_MAP_REGION_RESPONSE = 'FACILITY_MAP_REGION_RESPONSE'
const FACILITY_MAP_POINTS_RESPONSE = 'FACILITY_MAP_POINTS_RESPONSE'
const FACILITY_MAP_ERROR = 'FACILITY_MAP_ERROR'

const SET_RMNCH_VIEW = 'SET_RMNCH_VIEW'
const SET_OPD_VIEW = 'SET_OPD_VIEW'
const FACILITY_RMNCH_REQUEST = 'FACILITY_RMNCH_REQUEST'
const FACILITY_RMNCH_RESPONSE = 'FACILITY_RMNCH_RESPONSE'
const FACILITY_RMNCH_ERROR = 'FACILITY_RMNCH_ERROR'

// ------------------------------------ Actions ------------------------------------

export const getFacilityInfo = (id, period) => {
  return (dispatch, getState) => {
    dispatch({type: FACILITY_INFO_REQUEST})
    api.getFacilityData(id, period).then(data => {
      dispatch({'type': FACILITY_INFO_RESPONSE, data})
    }).catch(error => {
      dispatch({'type': FACILITY_INFO_ERROR, error})
    })
  }
};

export const getFacilityPopulation = (id, period) => {
  return (dispatch, getState) => {
    dispatch({type: FACILITY_POPULATION_REQUEST})
    api.getFacilityData(id, period, 'population').then(data => {
      dispatch({'type': FACILITY_POPULATION_RESPONSE, data})
    }).catch(error => {
      dispatch({'type': FACILITY_POPULATION_ERROR, error})
    })
  }
};

export const getFacilityDiagnoses = (id, period) => {
  
  return (dispatch, getState) => {
    dispatch({ type: FACILITY_DIAGNOSES_REQUEST })
    api.getFacilityData(id, period, 'diagnoses').then(data => {
      dispatch({ 'type': FACILITY_DIAGNOSES_RESPONSE, data })
    }).catch(error => {
      dispatch({ 'type': FACILITY_DIAGNOSES_ERROR, error })
    })
  }
};


export const getFacilityRMNCH = (id, period) => {
  return (dispatch, getState) => {
    dispatch({ type: FACILITY_RMNCH_REQUEST })
    api.getFacilityData(id, period, 'rmnch').then(data => {
      dispatch({ 'type': FACILITY_RMNCH_RESPONSE, data })
    }).catch(error => {
      dispatch({ 'type': FACILITY_RMNCH_ERROR, error })
    })
  }
};


export const getMapShape = (facilityData) => {

  let getShapeMethod = api.findWards
  let params = {wards: facilityData.getIn(['ward', 'gid'])}
  if (facilityData.getIn(['type', 'dhis2Id']) === 'FgLhM6ea9dS' || facilityData.getIn(['type', 'dhis2Id']) === 'WK2vj3N9aA0' ) { //if facility type is hospital or health center, load all districts from region
    getShapeMethod = api.findDistricts
    params = {regions: facilityData.getIn(['region', 'gid'])}
  }
  return (dispatch, getState) => {
    let params = {wards: facilityData.getIn(['ward', 'gid'])}
    if (facilityData.getIn(['type', 'dhis2Id']) === 'FgLhM6ea9dS' || facilityData.getIn(['type', 'dhis2Id']) === 'WK2vj3N9aA0' ) { //if facility type is hospital or health center, load all districts from region
      getShapeMethod = api.findDistricts
      params = {regions: facilityData.getIn(['region', 'gid'])}
      //get region shape
      dispatch({type: FACILITY_MAP_REQUEST})
      api.findRegions(params).then(data => {
        dispatch({'type': FACILITY_MAP_REGION_RESPONSE, data })
      }).catch(error => {
        dispatch({'type': FACILITY_MAP_ERROR, error})
      })
    }
    dispatch({type: FACILITY_MAP_REQUEST})
      getShapeMethod(params).then(data => {
      dispatch({'type': FACILITY_MAP_SHAPE_RESPONSE, data })
    }).catch(error => {
      dispatch({'type': FACILITY_MAP_ERROR, error})
    })
  }
};

export const getMapPoints = (facilityData) => {
  let params = {wards: facilityData.getIn(['ward', 'gid']), type: facilityData.getIn(['type', 'dhis2Id'])}
  if (facilityData.getIn(['type', 'dhis2Id']) === 'FgLhM6ea9dS' || facilityData.getIn(['type', 'dhis2Id']) === 'WK2vj3N9aA0' ) { //if facility type is hospital or health center, load facilities from region
    params = {regions: facilityData.getIn(['region', 'gid']), types: facilityData.getIn(['type', 'id'])}
  }
  return (dispatch, getState) => {
    dispatch({type: FACILITY_MAP_REQUEST})
    api.findFacilities(params).then(data => {
      dispatch({'type': FACILITY_MAP_POINTS_RESPONSE, data })
    }).catch(error => {
      dispatch({'type': FACILITY_MAP_ERROR, error})
    })
  }
};

export const setOPDView = (view) => {
  return (dispatch, getState) => {
    dispatch({type: SET_OPD_VIEW, view})
  }
}

export const setRMNCHView = (view) => {
  return (dispatch, getState) => {
    dispatch({type: SET_RMNCH_VIEW, view})
  }
}

// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  [FACILITY_INFO_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'info', 'loading'], true)
  },
  [FACILITY_INFO_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'info'], Immutable.fromJS(data)).setIn(['reportData', 'info', 'loading'], false)
  },
  [FACILITY_INFO_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'info', 'error'], error).setIn(['reportData', 'info', 'loading'], false)
  },

  [FACILITY_POPULATION_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'population', 'loading'], true)
  },
  [FACILITY_POPULATION_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'population', 'data'], Immutable.fromJS(api.getAggregatedPopulation(data))).setIn(['reportData', 'population', 'loading'], false)
  },
  [FACILITY_POPULATION_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'population', 'error'], error).setIn(['reportData', 'population', 'loading'], false)
  },

  [FACILITY_DIAGNOSES_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'diagnoses', 'loading'], true)
  },
  [FACILITY_DIAGNOSES_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'diagnoses', 'data'], Immutable.fromJS(api.getAggregatedDiagnosis(data))).setIn(['reportData', 'diagnoses', 'loading'], false)
  },
  [FACILITY_DIAGNOSES_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'diagnoses', 'error'], error).setIn(['reportData', 'diagnoses', 'loading'], false)
  },

  [FACILITY_RMNCH_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'RMNCH', 'loading'], true)
  },
  [FACILITY_RMNCH_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'RMNCH', 'data'], Immutable.fromJS(data)).setIn(['reportData', 'RMNCH', 'loading'], false)
  },
  [FACILITY_RMNCH_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'RMNCH', 'error'], error).setIn(['reportData', 'RMNCH', 'loading'], false)
  },

  [FACILITY_MAP_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'map', 'loading'], true)
  },
  [FACILITY_MAP_SHAPE_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'map', 'shape'], Immutable.fromJS(data)).setIn(['reportData', 'map', 'loading'], false)
  },
  [FACILITY_MAP_REGION_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'map', 'region'], Immutable.fromJS(data)).setIn(['reportData', 'map', 'loading'], false)
  },
  [FACILITY_MAP_POINTS_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'map', 'points'], Immutable.fromJS(data)).setIn(['reportData', 'map', 'loading'], false)
  },
  [FACILITY_MAP_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'map', 'error'], error).setIn(['reportData', 'map', 'loading'], false)
  },
  [SET_OPD_VIEW]: (state, action) => {
    const {view} = action
    return state.setIn(['OPDView'], view)
  },
  [SET_RMNCH_VIEW]: (state, action) => {
    const {view} = action
    return state.setIn(['RMNCHView'], view)
  }
};

// ------------------------------------ Helpers ------------------------------------

const sumValues = (dataset) => {
  let total = 0
  dataset.forEach(i => total += i.value)
  return total
}



// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({
  'reportData': {
    'info': {
      'loading': false,
      'type': {},
      'ward': {},
      'district': {},
      'region': {},
    },
    'population': {
      'loading': false,
      'data': {},
    },
    'diagnoses': {
      'loading': false,
      'data': [],
    },
    'map': {
      'loading': false,
      'shape': {},
      'points': [],
      'region': {},
    }
  },
  'OPDView': 'table',
  'RMNCHView': 'table',

});

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
