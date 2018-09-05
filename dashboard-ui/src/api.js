const API_ROOT_URL = (document.location.hostname === 'localhost') ? 'http://localhost:8083' : '';
const API_DISTRICTS = API_ROOT_URL + '/geo/districts'
const API_WARDS = API_ROOT_URL + '/geo/wards'
const API_WARD_INFO = API_ROOT_URL + '/wards'
const API_WARD_REPORT_INFO = `${API_ROOT_URL}/wardReport`
const API_FACILITY_REPORT_INFO = `${API_ROOT_URL}/facilities`
const API_FACILITIES= `${API_ROOT_URL}/facilities`


export const findDistricts = (params) => {
  const url = API_DISTRICTS + '?' + prepareQuery(Object.assign({ }, params))
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(
        function(response) {
          if (response.status !== 200) {
            reject(response)
          }
          response.json().then(function(data) {
            resolve(data);
          });
        }
      )
      .catch(function(err) {
        reject('Fetch Error :-S', err);
      });
  })
}

export const findWards = (params) => {
  const url = API_WARDS + '?' + prepareQuery(Object.assign({ }, params))
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(
        function(response) {

          if (response.status !== 200) {
            reject(response)
          }
          // Examine the text in the response
          response.json().then(function(data) {
            resolve(data);
          });
        }
      )
      .catch(function(err) {
        reject('Fetch Error :-S', err);
      });
  })
}

export const findFacilities = (params) => {
  const url = API_FACILITIES + '?' + prepareQuery(Object.assign({ }, params))
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(
        function(response) {
          if (response.status !== 200) {
            reject(response)
          }
          // Examine the text in the response
          response.json().then(function(data) {
            resolve(data);
          });
        }
      )
      .catch(function(err) {
        reject('Fetch Error :-S', err);
      });
  })
}

export const getWardInfo = (id, period) => {
  const url = `${API_WARD_REPORT_INFO}/${id}?${prepareQuery(Object.assign({ }, period))}`
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(
        function(response) {
          if (response.status !== 200) {
            reject(response)
          }
          response.json().then(function(data) {
            resolve(data);
          });
        }
      )
      .catch(function(err) {
        reject('Fetch Error :-S', err);
      });
  })
}

export const getFacilityData = (id, period, type) => {
  const url = `${API_FACILITY_REPORT_INFO}/${id}/${type || ''}?${preparePeriodQuery(period)}`
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(
        function(response) {
          if (response.status !== 200) {
            reject(response)
          }
          response.json().then(function(data) {
            resolve(data);
          });
        }
      )
      .catch(function(err) {
        reject('Fetch Error :-S', err);
      });
  })
}

const prepareQuery = (params) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

const preparePeriodQuery = (period) => {
  const periodObject = {}
  if (period) {
    const periodSp = period.split('_')
    periodSp.forEach(p => {
      periodObject[p.split('-')[0]] = p.split('-')[1]
    })
  }
  return prepareQuery(periodObject)
}
