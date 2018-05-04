import Immutable from 'immutable';
// ------------------------------------ Constants ------------------------------------
const CALL_API = 'CALL_API';
const CALL_API_DONE = 'CALL_API_DONE';
const CALL_API_FAILED = 'CALL_API_FAILED';

export const call = () => {
  return (dispatch, getState) => {

  }
};

// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  [GET_COUNTRIES_LIST_DONE]: (state, action) => {
    return state.setIn(['data'], null)
  }


};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({ app: {} });

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ?
    handler(state, action) :
    state
}
