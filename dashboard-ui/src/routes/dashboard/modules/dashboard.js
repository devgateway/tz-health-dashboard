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

export const GET_CONF_DONE = 'GET_CONF_DONE'

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


export const getConfiguration=()=>{
  return (dispatch, getState) => {
    api.getConfiguration().then(data => {
      data.years.sort((d,d1)=>d1-d);
      dispatch({ 'type': 'GET_CONF_DONE', data: Immutable.fromJS(data)})
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
  ['GET_CONF_DONE']: (state, action) => {
    const {data} = action
    const detailedTypes = data.get('detailedTypes')
    const typeMapping = state.get('typeMapping').toJS()
    const mappingUpdated = typeMapping.map(type => {
      const detType = detailedTypes.toJS().find(d => d.dhis2Id === type.dhis2Id)
      return Object.assign(type, {id: detType ? detType.id : null})
    })
    return state.setIn(['conf'], data).setIn(['typeMapping'], Immutable.fromJS(mappingUpdated))
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
    return state;
  }
};

// ------------------------------------ Reducer ------------------------------------
const initialState = Immutable.fromJS({
  'dashboard': true, 
  'period': api.parsePeriod('y-2017'),
  'typeMapping': [
    {'dhis2Id': 'FgLhM6ea9dS', 'typeName': 'Health Center', 'maskType': 'Health Center', 'boundary': 'district', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findDistricts, 'paramField': 'districts', 'paramValue': 'district'},
    {'dhis2Id': 'O4hfhLGzu8H', 'typeName': 'Regional Referral Hospital', 'maskType': 'Hospital', 'boundary': 'region', 'getShapeMethod': api.findDistricts, 'getBorderMethod': api.findRegions, 'paramField': 'regions', 'paramValue': 'region'},
    {'dhis2Id': 'YUJl1RAk6Gt', 'typeName': 'Health Labs', 'maskType': 'Hospital', 'boundary': 'district', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findDistricts, 'paramField': 'districts', 'paramValue': 'district'},
    {'dhis2Id': 'DvJehvyBpEQ', 'typeName': 'Dispensary', 'maskType': 'Dispensary', 'boundary': 'ward', 'getShapeMethod': null, 'getBorderMethod': api.findWards, 'paramField': 'wards', 'paramValue': 'ward'},
    {'dhis2Id': 'LdiS9jKDmYj', 'typeName': 'District Hospital', 'maskType': 'Hospital', 'boundary': 'district', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findDistricts, 'paramField': 'districts', 'paramValue': 'district'},
    {'dhis2Id': 'P9dlUDycTwP', 'typeName': 'National Hospital', 'maskType': 'Hospital', 'boundary': 'region', 'getShapeMethod': api.findDistricts, 'getBorderMethod': api.findRegions, 'paramField': 'regions', 'paramValue': 'region'},
    {'dhis2Id': 'gJQCkKyX8ph', 'typeName': 'Nursing Home', 'maskType': 'Health Center', 'boundary': 'district', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findDistricts, 'paramField': 'districts', 'paramValue': 'district'},
    {'dhis2Id': 'xlorplD1QwS', 'typeName': 'Referral Hospital', 'maskType': 'Hospital', 'boundary': 'region', 'getShapeMethod': api.findDistricts, 'getBorderMethod': api.findRegions, 'paramField': 'regions', 'paramValue': 'region'},
    {'dhis2Id': 'v4blQv4R67J', 'typeName': 'Designated District Hospital', 'maskType': 'Hospital', 'boundary': 'district', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findDistricts, 'paramField': 'districts', 'paramValue': 'district'},
    {'dhis2Id': 'rHjr1oAqSIS', 'typeName': 'National Super Specialist Hospital', 'maskType': 'Hospital', 'boundary': 'region', 'getShapeMethod': api.findDistricts, 'getBorderMethod': api.findRegions, 'paramField': 'regions', 'paramValue': 'region'},
    {'dhis2Id': 'xQDiGgEFknR', 'typeName': 'Eye Clinic', 'maskType': 'Clinic', 'boundary': 'district', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findDistricts, 'paramField': 'districts', 'paramValue': 'district'},
    {'dhis2Id': 'Y6oYSbQE2Tp', 'typeName': 'Regional Hospital', 'maskType': 'Hospital', 'boundary': 'region', 'getShapeMethod': api.findDistricts, 'getBorderMethod': api.findRegions, 'paramField': 'regions', 'paramValue': 'region'},
    {'dhis2Id': 'tnz6uusQqSf', 'typeName': 'Other Hospital', 'maskType': 'Hospital', 'boundary': 'region', 'getShapeMethod': api.findDistricts, 'getBorderMethod': api.findRegions, 'paramField': 'regions', 'paramValue': 'region'},
    {'dhis2Id': 'I326qTfkdwh', 'typeName': 'Zonal Super Specialist Hospital', 'maskType': 'Hospital', 'boundary': 'region', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findRegions, 'paramField': 'regions', 'paramValue': 'region'},
    {'dhis2Id': 'LGk92i9DOFU', 'typeName': 'Dental Clinic', 'maskType': 'Clinic', 'boundary': 'district', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findDistricts, 'paramField': 'districts', 'paramValue': 'district'},
    {'dhis2Id': 'AMbDPYNQ2ha', 'typeName': 'Other Clinic', 'maskType': 'Clinic', 'boundary': 'district', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findDistricts, 'paramField': 'districts', 'paramValue': 'district'},
    {'dhis2Id': 'gKAkwmPuTLz', 'typeName': 'Maternity Home', 'maskType': 'Health Center', 'boundary': 'district', 'getShapeMethod': api.findWards, 'getBorderMethod': api.findDistricts, 'paramField': 'districts', 'paramValue': 'district'},
  ]
});

// reducer is returned as default
export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
