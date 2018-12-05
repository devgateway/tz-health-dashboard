import Immutable from 'immutable';
import * as api from '../../../../../api'

// ------------------------------------ Constants ------------------------------------
const WARD_INFO_REQUEST = 'WARD_INFO_REQUEST'
const WARD_INFO_RESPONSE = 'WARD_INFO_RESPONSE'
const WARD_INFO_ERROR = 'WARD_INFO_ERROR'
const WARD_POPULATION_REQUEST = 'WARD_POPULATION_REQUEST'
const WARD_POPULATION_RESPONSE = 'WARD_POPULATION_RESPONSE'
const WARD_POPULATION_ERROR = 'WARD_POPULATION_ERROR'

const WARD_DIAGNOSES_REQUEST = 'WARD_DIAGNOSES_REQUEST'
const WARD_DIAGNOSES_RESPONSE = 'WARD_DIAGNOSES_RESPONSE'
const WARD_DIAGNOSES_ERROR = 'WARD_DIAGNOSES_ERROR'

const WARD_MAP_REQUEST = 'WARD_MAP_SHAPE_REQUEST'
const WARD_MAP_SHAPE_RESPONSE = 'WARD_MAP_SHAPE_RESPONSE'
const WARD_MAP_POINTS_RESPONSE = 'WARD_MAP_POINTS_RESPONSE'
const WARD_MAP_ERROR = 'WARD_MAP_ERROR'


const WARD_RMNCH_REQUEST = 'WARD_RMNCH_REQUEST'
const WARD_RMNCH_RESPONSE = 'WARD_RMNCH_RESPONSE'
const WARD_RMNCH_ERROR = 'WARD_RMNCH_ERROR'

// ------------------------------------ Actions ------------------------------------

export const getWardInfo = (id, period) => {
  return (dispatch, getState) => {
    dispatch({type: WARD_INFO_REQUEST})
    api.getWardData(id, period).then(data => {
      dispatch({'type': WARD_INFO_RESPONSE, data})
    }).catch(error => {
      dispatch({'type': WARD_INFO_ERROR, error})
    })
  }
};

export const getWardPopulation = (id, period) => {

  return (dispatch, getState) => {
    dispatch({type: WARD_POPULATION_REQUEST})
    api.getWardData(id, period, 'population').then(data => {
      dispatch({'type': WARD_POPULATION_RESPONSE, data})
    }).catch(error => {
      dispatch({'type': WARD_POPULATION_ERROR, error})
    })
  }
};

export const getWardDiagnoses = (id, period) => {

  return (dispatch, getState) => {
    dispatch({ type: WARD_DIAGNOSES_REQUEST })
    api.getWardData(id, period, 'diagnoses').then(data => {
      dispatch({ 'type': WARD_DIAGNOSES_RESPONSE, data })
    }).catch(error => {
      dispatch({ 'type': WARD_DIAGNOSES_ERROR, error })
    })
  }
};


export const getWardRMNCH = (id, period) => {

  return (dispatch, getState) => {
    dispatch({ type: WARD_RMNCH_REQUEST })
    api.getWardData(id, period, 'rmnch').then(data => {
      dispatch({ 'type': WARD_RMNCH_RESPONSE, data })
    }).catch(error => {
      dispatch({ 'type': WARD_RMNCH_ERROR, error })
    })
  }
};

export const getMapShape = (wardData) => {
  let getShapeMethod = api.findWards
  let params = {wards: wardData.getIn(['gid'])}
  return (dispatch, getState) => {
    dispatch({type: WARD_MAP_REQUEST})
    getShapeMethod(params).then(data => {
      dispatch({'type': WARD_MAP_SHAPE_RESPONSE, data })
    }).catch(error => {
      dispatch({'type': WARD_MAP_ERROR, error})
    })
  }
};

export const getMapPoints = (wardData) => {
  let params = {districts: wardData.getIn(['district', 'gid'])}
  return (dispatch, getState) => {
    dispatch({type: WARD_MAP_REQUEST})
    api.findFacilities(params).then(data => {
      dispatch({'type': WARD_MAP_POINTS_RESPONSE, data })
    }).catch(error => {
      dispatch({'type': WARD_MAP_ERROR, error})
    })
  }
};


// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  [WARD_INFO_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'info', 'loading'], true)
  },
  [WARD_INFO_RESPONSE]: (state, action) => {
    const {data} = action;

    return state.setIn(['reportData', 'info'], Immutable.fromJS(data)).setIn(['reportData', 'info', 'loading'], false)
  },
  [WARD_INFO_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'info', 'error'], error).setIn(['reportData', 'info', 'loading'], false)
  },

  [WARD_POPULATION_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'population', 'loading'], true)
  },
  [WARD_POPULATION_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'population', 'data'], Immutable.fromJS(api.getAggregatedPopulation(data))).setIn(['reportData', 'population', 'loading'], false)
  },
  [WARD_POPULATION_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'population', 'error'], error).setIn(['reportData', 'population', 'loading'], false)
  },

  [WARD_DIAGNOSES_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'diagnoses', 'loading'], true)
  },
  [WARD_DIAGNOSES_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'diagnoses', 'data'], Immutable.fromJS(api.getAggregatedDiagnosis(data))).setIn(['reportData', 'diagnoses', 'loading'], false)
  },
  [WARD_DIAGNOSES_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'diagnoses', 'error'], error).setIn(['reportData', 'diagnoses', 'loading'], false)
  },

  [WARD_RMNCH_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'RMNCH', 'loading'], true)
  },
  [WARD_RMNCH_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'RMNCH', 'data'], Immutable.fromJS(data)).setIn(['reportData', 'RMNCH', 'loading'], false)
  },
  [WARD_RMNCH_ERROR]: (state, action) => {
    const {error} = action;

    return state.setIn(['reportData', 'RMNCH', 'error'], error).setIn(['reportData', 'RMNCH', 'loading'], false)
  },

  [WARD_MAP_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'map', 'loading'], true)
  },
  [WARD_MAP_SHAPE_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'map', 'shape'], Immutable.fromJS(data)).setIn(['reportData', 'map', 'loading'], false)
  },
  [WARD_MAP_POINTS_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'map', 'points'], Immutable.fromJS(data)).setIn(['reportData', 'map', 'loading'], false)
  },
  [WARD_MAP_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'map', 'error'], error).setIn(['reportData', 'map', 'loading'], false)
  }
};

// ------------------------------------ Helpers ------------------------------------



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
    }
  }
});

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
