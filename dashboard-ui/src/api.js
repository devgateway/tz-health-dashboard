const API_ROOT_URL = (document.location.hostname === 'localhost') ? 'http://localhost:8083' : '';
const API_DISTRICT = API_ROOT_URL + '/district/find'
const API_WARDS = API_ROOT_URL + '/ward/find'

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

export const findDWards = (params) => {

  const requestParams=Object.assign({'simplifyFactor':0},params)

  debugger;
  var esc = encodeURIComponent;
  const query = Object.keys(requestParams)
      .map(k => esc(k) + '=' + esc(requestParams[k]))
      .join('&');



  const url=API_WARDS+'?'+query

  return new Promise((resolve, reject) => {

    fetch(url, requestParams)
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
