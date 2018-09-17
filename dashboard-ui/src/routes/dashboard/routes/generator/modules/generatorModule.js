import Immutable from 'immutable';
import * as api from '../../../../../api'

// ------------------------------------ Constants ------------------------------------
const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'
const GET_ITEMS_RESPONSE = 'GET_ITEMS_RESPONSE'
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR'
const REGION_SELECTED = 'REGION_SELECTED'
const DISTRICT_SELECTED = 'DISTRICT_SELECTED'
const WARD_SELECTED = 'WARD_SELECTED'
const FACILITY_SELECTED = 'FACILITY_SELECTED'
const apiMethods = {
  'region': api.findRegions,
  'district': api.findDistricts,
  'ward': api.findWards,
  'facility': api.findFacilities
}

// ------------------------------------ Actions ------------------------------------

export const getGeoItemsList = (itemType, params) => {
  return (dispatch, getState) => {
  	dispatch({type: GET_ITEMS_REQUEST})
    apiMethods[itemType](params).then(data => {
      dispatch({itemType, 'type': GET_ITEMS_RESPONSE, data })
    }).catch(error => {
      dispatch({itemType, 'type': GET_ITEMS_ERROR, error})
    })
  }
}

export const selectRegion = (region) => {
  return (dispatch, getState) => {
    dispatch({type: REGION_SELECTED, region})
  }
}

export const selectDistrict = (district) => {
  return (dispatch, getState) => {
    dispatch({type: DISTRICT_SELECTED, district})
  }
}

export const selectWard = (ward) => {
  return (dispatch, getState) => {
    dispatch({type: WARD_SELECTED, ward})
  }
}

export const selectFacility = (facility) => {
  return (dispatch, getState) => {
    dispatch({type: FACILITY_SELECTED, facility})
  }
}

// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  [GET_ITEMS_REQUEST]: (state, action) => {
    return state.setIn([action.itemType, 'loading'], true)
  },
  [GET_ITEMS_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn([action.itemType, 'list'], Immutable.fromJS(data))
      .setIn([action.itemType, 'loading'], false)
  },
  [GET_ITEMS_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn([action.itemType, 'error'], Immutable.fromJS(error))
      .setIn([action.itemType, 'loading'], false)
  },
  [REGION_SELECTED]: (state, action) => {
    const {region} = action;
    return state.setIn(['region', 'selected'], region)
      .setIn(['district', 'list', 'features'], [])
      .setIn(['ward', 'list', 'features'], [])
      .setIn(['facility', 'list'], [])
      .setIn(['district', 'selected'], null)
      .setIn(['ward', 'selected'], null)
      .setIn(['facility', 'selected'], null)
  },
  [DISTRICT_SELECTED]: (state, action) => {
    const {district} = action;
    return state.setIn(['district', 'selected'], district)
      .setIn(['ward', 'list', 'features'], [])
      .setIn(['facility', 'list'], [])
      .setIn(['ward', 'selected'], null)
      .setIn(['facility', 'selected'], null)
  },
  [WARD_SELECTED]: (state, action) => {
    const {ward} = action;
    return state.setIn(['ward', 'selected'], ward)
      //.setIn(['facility', 'list'], [])
      .setIn(['facility', 'selected'], null)
  },
  [FACILITY_SELECTED]: (state, action) => {
    const {facility} = action;
    return state.setIn(['facility', 'selected'], facility)
  },
};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({
  'region': {
    'loading': false,
    'list': {
      'features': [],
    }, 
    'selected': null
  },
  'district': {
    'loading': false,
    'list': {
      'features': [],
    }, 
    'selected': null
  },
  'ward': {
    'loading': false,
    'list': {
      'features': [],
    }, 
    'selected': null
  },
  'facility': {
    'loading': false,
    'list': [], 
    'selected': null
  },
  'searchResults': []
});

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
