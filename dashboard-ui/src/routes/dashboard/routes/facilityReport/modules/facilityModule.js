import Immutable from 'immutable';
import * as api from '../../../../../api'

// ------------------------------------ Constants ------------------------------------
const FACILITY_INFO_REQUEST = 'FACILITY_INFO_REQUEST'
const FACILITY_INFO_RESPONSE = 'FACILITY_INFO_RESPONSE'
const FACILITY_INFO_ERROR = 'FACILITY_INFO_ERROR'

// ------------------------------------ Actions ------------------------------------

export const getFacilityInfo = (id, period) => {
  return (dispatch, getState) => {
  	dispatch({type: FACILITY_INFO_REQUEST})
    api.getFacilityInfo(id, period).then(data => {
      dispatch({'type': FACILITY_INFO_RESPONSE, data })
    }).catch(error => {
      dispatch({'type': FACILITY_INFO_ERROR, error})
    })
  }
};

// ------------------------------------ Action Handlers ------------------------------------
const ACTION_HANDLERS = {
  [FACILITY_INFO_REQUEST]: (state, action) => {
    return state.setIn(['reportData', 'loading'], true)
  },
  [FACILITY_INFO_RESPONSE]: (state, action) => {
    const {data} = action;
    return state.setIn(['reportData', 'data'], data).setIn(['reportData', 'loading'], false)
  },
  [FACILITY_INFO_ERROR]: (state, action) => {
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
