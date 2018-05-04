import Immutable from 'immutable';




// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  ['DO_SOMETHING']: (state, action) => {
    return state.setIn(['data'], null)
  }
};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({ 'dashboard': true });

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
