import Immutable from 'immutable';
import * as api from '../../../../../api'

// ------------------------------------ Constants ------------------------------------
const WARD_INFO_REQUEST = 'WARD_INFO_REQUEST'
const WARD_INFO_RESPONSE = 'WARD_INFO_RESPONSE'
const WARD_INFO_ERROR = 'WARD_INFO_ERROR'

// ------------------------------------ Actions ------------------------------------

export const getWardInfo = (id, period) => {
  return (dispatch, getState) => {
  	dispatch({type: WARD_INFO_REQUEST})
    api.getWardInfo(id, period).then(data => {
      dispatch({'type': WARD_INFO_RESPONSE, data })
    }).catch(error => {
      dispatch({'type': WARD_INFO_ERROR, error})
    })
  }
};

// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  [WARD_INFO_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'loading'], true)
  },
  [WARD_INFO_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'data'], data).setIn(['reportData', 'loading'], false)
  },
  [WARD_INFO_ERROR]: (state, action) => {
    const {error} = action;
    return state.setIn(['reportData', 'error'], error).setIn(['reportData', 'loading'], false)
  },
};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({'reportData': {'loading': false, 'data': null, 'error': null}});

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
