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
    dispatch(findWards({ districtId: id }))
  }
}

export const findDistricts = () => {
  return (dispatch, getState) => {
    api.findDistricts().then(data => {
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

export const getWard = (id) => {
  return (dispatch, getState) => {
    api.getWard(id).then(feature => {
      dispatch({ 'type': GET_FEATURE_DONE, feature, 'category': CATEGORY_WARD })
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
};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({ 'dashboard': true });

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
