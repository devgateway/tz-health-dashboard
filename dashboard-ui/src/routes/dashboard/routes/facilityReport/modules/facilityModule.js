import Immutable from 'immutable';
import * as api from '../../../../../api'

// ------------------------------------ Constants ------------------------------------
const FACILITY_INFO_REQUEST = 'FACILITY_INFO_REQUEST'
const FACILITY_INFO_RESPONSE = 'FACILITY_INFO_RESPONSE'
const FACILITY_INFO_ERROR = 'FACILITY_INFO_ERROR'
const FACILITY_MAP_REQUEST = 'FACILITY_MAP_SHAPE_REQUEST'
const FACILITY_MAP_SHAPE_RESPONSE = 'FACILITY_MAP_SHAPE_RESPONSE'
const FACILITY_MAP_POINTS_RESPONSE = 'FACILITY_MAP_POINTS_RESPONSE'

// ------------------------------------ Actions ------------------------------------

export const getFacilityInfo = (id, infoType) => {
  if (infoType) {
    return getFacilityInfoByType(id, infoType)
  } else {
    return (dispatch, getState) => {
      dispatch({type: FACILITY_INFO_REQUEST})
      api.getFacilityInfo(id).then(data => {
        dispatch({'type': FACILITY_INFO_RESPONSE, data, infoType: 'main' })
        dispatch({'type': FACILITY_MAP_REQUEST})
        dispatch(getMapShape(data))
        dispatch(getMapPoints(data))
      }).catch(error => {
        dispatch({'type': FACILITY_INFO_ERROR, error})
      })
    }
  }
};

const getFacilityInfoByType = (id, infoType) => {
  return (dispatch, getState) => {
    dispatch({type: FACILITY_INFO_REQUEST})
    api.getFacilityInfo(id, infoType).then(data => {
      dispatch({'type': FACILITY_INFO_RESPONSE, data, infoType })
    }).catch(error => {
      dispatch({'type': FACILITY_INFO_ERROR, error})
    })
  }
};

export const getMapShape = (facilityData) => {
  let getShapeMethod = api.findWards
  let params = {wards: facilityData.ward.id}
  if (facilityData.type.dhis2Id === 'FgLhM6ea9dS' || facilityData.type.dhis2Id === 'WK2vj3N9aA0' ) { //if facility type is hospital or health center, load all districts from region
    getShapeMethod = api.findDistricts
    params = {regions: facilityData.region.id}
  }
  return (dispatch, getState) => {
    getShapeMethod(params).then(data => {
      dispatch({'type': FACILITY_MAP_SHAPE_RESPONSE, data })
    })
  }
};

export const getMapPoints = (facilityData) => {
  let params = {wards: facilityData.ward.id, type: facilityData.type.dhis2Id}
  if (facilityData.type.dhis2Id === 'FgLhM6ea9dS' || facilityData.type.dhis2Id === 'WK2vj3N9aA0' ) { //if facility type is hospital or health center, load facilities from region
    params = {regions: facilityData.region.id, type: facilityData.type.dhis2Id}
  }
  return (dispatch, getState) => {
    api.findFacilities(params).then(data => {
      dispatch({'type': FACILITY_MAP_POINTS_RESPONSE, data })
    })
  }
};


// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  [FACILITY_INFO_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'loading'], true)
  },
  [FACILITY_INFO_RESPONSE]: (state, action) => {
    const {data, infoType} = action;
    return state.setIn(['reportData', infoType], Immutable.fromJS(data)).setIn(['reportData', 'loading'], false)
  },
  [FACILITY_MAP_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'map', 'shape'], Immutable.fromJS({})).setIn(['reportData', 'map', 'points'], Immutable.fromJS([]))
  },
  [FACILITY_MAP_SHAPE_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'map', 'shape'], Immutable.fromJS(data))
  },
  [FACILITY_MAP_POINTS_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'map', 'points'], Immutable.fromJS(data))
  },
  [FACILITY_INFO_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'error'], error).setIn(['reportData', 'loading'], false)
  },
};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({
  'reportData': {
    'loading': false, 
    'main': {
      type: {},
      ward: {},
      district: {},
      region: {},
    },
    population: [],
    'error': null,
    'map': {
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
