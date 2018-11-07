import Immutable from 'immutable';
import * as api from '../../../api'

const FIND_BOUNDARY_DONE = "FIND_BOUNDARY_DONE"
//const FIND_BOUNDARY_FAILED = "FIND_BOUNDARY_FAILED"

const GET_FEATURE_DONE = "GET_FEATURE_DONE"
//const GET_FEATURE_FAILED = "GET_FEATURE_FAILED"

export const CATEGORY_DISTRICT = "district"
export const CATEGORY_WARD = "ward"
export const CATEGORY_FACILITY = "facility"

export const FEATURE_SELECTED = 'FEATURE_SELECTED'
export const FIND_FACILITIES_DONE = 'FIND_FACILITIES_DONE'

export const wardSelected = (feature) => {
  const { properties: { ID: id } } = feature
  return (dispatch, getState) => {
    dispatch({ 'type': FEATURE_SELECTED, 'category': CATEGORY_WARD, feature })
    dispatch(findFacilities({ wards: id }))
  }
}

export const districtSelected = (feature) => {
  const { properties: { ID: id } } = feature
  return (dispatch, getState) => {
    dispatch({ 'type': FEATURE_SELECTED, 'category': CATEGORY_DISTRICT, feature })
    dispatch(findWards({ districts: id }))
  }
}

export const findDistricts = (params) => {
  return (dispatch, getState) => {
    api.findDistricts(params).then(data => {
      dispatch({ 'type': FIND_BOUNDARY_DONE, 'category': CATEGORY_DISTRICT, data })
    })
  }
}


export const findWards = (params) => {
  return (dispatch, getState) => {
    api.findWards(params).then(data => {
      dispatch({ 'type': FIND_BOUNDARY_DONE, 'category': CATEGORY_WARD, data })
    })
  }
}

export const findFacilities = (params) => {
  return (dispatch, getState) => {
    api.findFacilities(params).then(data => {
      dispatch({ 'type': FIND_FACILITIES_DONE, 'category': CATEGORY_FACILITY, data })
    })
  }
}

// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  ['FIND_BOUNDARY_DONE']: (state, action) => {
    const { data, category } = action
    return state.setIn([category, 'list'], data)
  },
  ['GET_FEATURE_DONE']: (state, action) => {
    const { feature, category } = action
    return state.setIn([category, 'selected'], feature)
  },
  ['FEATURE_SELECTED']: (state, action) => {
    const { feature, category } = action
    return state.setIn([category, 'selected'], feature)
  },
  ['FIND_FACILITIES_DONE']: (state, action) => {
    const { data, category } = action
    return state.setIn([category, 'list'], data)
  },
  ['@@router/LOCATION_CHANGE']: (state, action) => {
    const { payload: { pathname } } = action;
    const lan = pathname.substring(1, 3);
    state = state.setIn(['lan'], lan)
    const pattern = pathname.substring(pathname.lastIndexOf('/') + 1);

    if (pattern) {
      const parsed = api.parsePeriod(pattern);
      if (parsed != null) {
        return state.setIn(['period'], Immutable.fromJS(parsed))
      }
    }
    debugger;
    return state;
  }
};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({ 'dashboard': true, 'period': api.parsePeriod('y-2017') });

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
