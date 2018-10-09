const API_ROOT_URL = (document.location.hostname === 'localhost') ? 'http://localhost:8083' : '';
const API_REGIONS = API_ROOT_URL + '/geo/regions'
const API_DISTRICTS = API_ROOT_URL + '/geo/districts'
const API_WARDS = API_ROOT_URL + '/geo/wards'
const API_WARD_INFO = API_ROOT_URL + '/wards'
const API_WARD_REPORT_INFO = `${API_ROOT_URL}/wards`
const API_FACILITY_REPORT_INFO = `${API_ROOT_URL}/facilities`
const API_FACILITIES = `${API_ROOT_URL}/facilities`


export const findRegions = (params) => {
  const url = API_REGIONS + '?' + prepareQuery(Object.assign({}, params))
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

export const findDistricts = (params) => {
  const url = API_DISTRICTS + '?' + prepareQuery(Object.assign({}, params))
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
  const url = API_WARDS + '?' + prepareQuery(Object.assign({}, params))
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
  const url = API_FACILITIES + '?' + prepareQuery(Object.assign({}, params))
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

export const getWardData = (id, period, type) => {
  const url = `${API_WARD_REPORT_INFO}/${id}/${type || ''}?${preparePeriodQuery(period)}`
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(
        function(response) {
          if (response.status !== 200) {
            reject(response)
          }
          try {
            response.json().then(function(data) {
              if (data) {
                resolve(data);
              } else {

              }
            });
          } catch (e) {

          }

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

export const getMonthName = (m, format) => {

  var date = new Date(2000, m - 1)
  let locale = "en-us",
    month = date.toLocaleString(locale, { month: format ? format : "long" });
  return month
}

export const getQuarterLabel = (q) => {
  let end = q * 3;
  let start = end - 2;

  return { start: getMonthName(start, 'short'), end: getMonthName(end, 'short') }
}


export const parsePeriod = (period) => {
  if (period && period.startsWith('y-')) {
    const periodObject = {}

    const periodSp = period.split('_')
    periodSp.forEach(p => {
      periodObject[p.split('-')[0]] = p.split('-')[1]
    })

    return periodObject

  } else {
    return null;
  }
}

export const composePeriod = (periodObject) => {

  const { y, m, q } = periodObject
  if (y && !m && !q) {
    return 'y-' + y
  }
  if (y && q) {
    return 'y-' + y + '_q-' + q
  } else if (y && m) {
    return 'y-' + y + '_m-' + m
  }
}



export const diffPercentage = (prev, val) => {

  if (prev == null || prev == 0) {
    return 'N/A'
  }
  return ((((prev - val) / prev) * 100) * -1).toFixed(2) + "%"
}


const sumValues = (dataset) => {
  let total = 0
  dataset.forEach(i => total += i.value)
  return total
}

export const getAggregatedPopulation = (data) => {
  const total = sumValues(data)
  const totalMale = sumValues(data.filter(i => i.gender.name === 'ME'))
  const totalFemale = sumValues(data.filter(i => i.gender.name === 'KE'))
  const totalUnder5 = sumValues(data.filter(i => i.age.name === '< 1' || i.age.name === '1-4'))
  const total5to60 = sumValues(data.filter(i => i.age.name !== '< 1' && i.age.name !== '1-4' && i.age.name !== '60+'))
  const totalAbove60 = sumValues(data.filter(i => i.age.name === '60+'))
  return { total, totalMale, totalFemale, totalUnder5, total5to60, totalAbove60 }
}


export const getAggregatedDiagnosis = (data) => {
  const parsedData = []
  data.forEach(d => {
    const { values, diagnostic, totalPrevPeriod } = d
    // "xLoqtMo0pI";"Umri chini ya mwezi 1" // "i3RHRoyrkuO";"Umri mwezi 1 hadi umri chini ya mwaka 1" // "Cw0V80VVLNX";"Umri mwaka 1 hadi umri chini ya miaka 5"
    const totalUnder5 = sumValues(values.filter(i => i.age.dhis2Id === "xLotqtMo0pI" || i.age.dhis2Id === "i3RHRoyrkuO" || i.age.dhis2Id === "Cw0V80VVLNX"))
    // "GF4Nq9E8x6l";"Umri miaka 5 hadi umri chini ya miaka 60"
    const total5to60 = sumValues(values.filter(i => i.age.dhis2Id === "GF4Nq9E8x6l"))
    // "UsRGaDRgUTs";"Umri miaka 60 au zaidi"
    const totalAbove60 = sumValues(values.filter(i => i.age.dhis2Id === "UsRGaDRgUTs"))
    const total = sumValues(values)
    parsedData.push({ dhis2Id: diagnostic.dhis2Id, diagnostic: diagnostic, total, totalPrevPeriod, ranges: { totalUnder5, total5to60, totalAbove60, total } })
  })
  return parsedData
}
