import Immutable from 'immutable';
import  * as api from '../../../api'
const FIND_BOUNDARY = "FIND_BOUNDARY"
const FIND_BOUNDARY_DONE = "FIND_BOUNDARY_DONE"
const FIND_BOUNDARY_FAILED = "FIND_BOUNDARY_FAILED"


export const findDistricts = () => {
  return (dispatch, getState) => {
    api.findDistricts().then(data => {
      dispatch({ 'type': FIND_BOUNDARY_DONE,'category':'districts', data })
    })
  }
}


export const findWards = (params) => {

  return (dispatch, getState) => {
    api.findDWards(params).then(data => {
      dispatch({ 'type': FIND_BOUNDARY_DONE, 'category':'wards', data })
    })
  }
}


// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  ['FIND_BOUNDARY_DONE']: (state, action) => {
    const { data, category } = action

    return state.setIn([category], data)
  }
};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({ 'dashboard': true });

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
