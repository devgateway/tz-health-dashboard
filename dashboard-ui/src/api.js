const API_ROOT_URL = (document.location.hostname === 'localhost') ? 'http://localhost:8083' : '';
const API_DISTRICT = API_ROOT_URL + '/district/find'
const API_WARDS = API_ROOT_URL + '/ward/find'
const API_WARD_INFO = API_ROOT_URL + '/wards'

export const findDistricts = () => {
  return new Promise((resolve, reject) => {
    fetch(API_DISTRICT)
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


export const getWard = (id) => {
  debugger
  const url = API_WARD_INFO + '/'+id
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


const prepareQuery = (params) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

export const findDWards = (params) => {

  const url = API_WARDS + '?' + prepareQuery(Object.assign({ 'simplifyFactor': 0 }, params))

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
