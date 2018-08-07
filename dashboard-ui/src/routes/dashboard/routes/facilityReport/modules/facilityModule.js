import Immutable from 'immutable';

// ------------------------------------ Constants ------------------------------------

// ------------------------------------ Actions ------------------------------------

// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  
};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({ });

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
