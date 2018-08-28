import React from 'react'
import PropTypes from "prop-types"
import D3Map from '../../../../../components/d3Map'
import TopTenDeseases from './topTenDeseasesTable'
import RMNCHTable from './RMNCHTable'

export default class WardLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { onGetFacilityInfo, params: {id, period} } = this.props;
    onGetFacilityInfo(id)
    onGetFacilityInfo(id, 'population')
    //onGetFacilityInfo(id, 'diagnoses')
  }

  getAggregatedPopulation(populationInfo){
    const total = this.sumPopulationValue(populationInfo)
    const totalMale = this.sumPopulationValue(populationInfo.filter(i => i.gender.name === 'ME'))
    const totalFemale = this.sumPopulationValue(populationInfo.filter(i => i.gender.name === 'KE'))
    const totalUnder5 = this.sumPopulationValue(populationInfo.filter(i => i.age.name === '< 1' || i.age.name === '1-4'))
    const total5to60 = this.sumPopulationValue(populationInfo.filter(i => i.age.name !== '< 1' && i.age.name !== '1-4' && i.age.name !== '60+'))
    const totalAbove60 = this.sumPopulationValue(populationInfo.filter(i => i.age.name === '60+'))   
    return {total, totalMale, totalFemale, totalUnder5, total5to60, totalAbove60}
  }

  sumPopulationValue(filteredDataset){
    let total = 0
    filteredDataset.forEach(i => total += i.value)
    return total
  }

  render() {
    const {params: {id, period}, mapShape, mapPoints, mainInfo = {}, populationInfo = []} = this.props
    const facilitiesFeatures = []
    if (mapPoints) {
      mapPoints.forEach(f => facilitiesFeatures.push({properties: {ID: f.id, NAME: f.name, fillColor: f.id == id ? '#980707' : null, strokeColor: '#57595d'}, geometry: f.point}))
    }
    const pointFeatures = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
    

    const facilityName = mainInfo.name
    const facilityType = mainInfo.type.name
    const watdName = mainInfo.ward.name
    const districtName = mainInfo.district.name
    const regionName = mainInfo.region.name
    
    const aggregatedPopulation = this.getAggregatedPopulation(populationInfo)

    const reportPeriod = 'Year 2017'
    
    return (
      <div>
        <div className="facility-report-container">
          <div className="report-header">
            <div className="facility-name">{facilityName}</div>
            <div className="report-period">{reportPeriod}</div>
          </div>
          <div className="location-box">
            <div><div className="location-title">Facility Type</div><div className="location-value">{facilityType}</div></div>
            <div><div className="location-title">Ward</div><div className="location-value">{watdName}</div></div>
            <div><div className="location-title">District</div><div className="location-value">{districtName}</div></div>
            <div><div className="location-title">Region</div><div className="location-value">{regionName}</div></div>
          </div>
          <div className="population-box">
            <div className="info">
              <div className="sub-title">Availability of Health Services in {regionName} region</div>
              <div className="total-pop"><span>{aggregatedPopulation.total}</span> Total Population</div>
              
              <div className="ages">
                <div className="value-label"><div>by Gender</div></div>
                <div className="value-item"><div>Male</div><div>{aggregatedPopulation.totalMale}</div></div>
                <div className="value-item"><div>Female</div><div>{aggregatedPopulation.totalFemale}</div></div>
              </div>

              <div className="ages">
                <div className="value-label"><div>by Age</div></div>
                <div className="value-item"><div>{'<5'}</div><div>{aggregatedPopulation.totalUnder5}</div></div>
                <div className="value-item"><div>{'5-60'}</div><div>{aggregatedPopulation.total5to60}</div></div>
                <div className="value-item"><div>{'>60'}</div><div>{aggregatedPopulation.totalAbove60}</div></div>
              </div>
              {/*}
              <div className="financing">
                <div className="financing-header">
                  <div className="">Financing</div>
                  <div className="">% of Patients Enrolled </div>
                  <div className="">Target</div>
                </div>
                <div className="financing-row">
                  <div className="">NHIF</div>
                  <div className="">22</div>
                  <div className="">80<span>below</span></div>
                </div>
                <div className="financing-row">
                  <div className="">CHF</div>
                  <div className="">9</div>
                  <div className="">15<span>below</span></div>
                </div>
              </div> 
              */}
            </div>
            <div className="map">
              {facilitiesFeatures.length > 0 && mapShape.features ?
                <D3Map width="570" height="450" colors={["#FF8C42", '#0C4700']} shapeFillOpacity="0" shapeStrokeWidth='2' shapeStrokeColor="#9C8568" shapeFeatures={mapShape} pointFeatures={pointFeatures} showBasemap={true}></D3Map>
              : null}
            </div>
          </div>

          <div className="top-ten-deseases">
            <div className="sub-title">Out-Patient Diseases (OPD) at {facilityName} </div>
            <TopTenDeseases/>
          </div>

          <div className="RMNCH-box">
            <div className="sub-title">Reproductive Maternal, Newborn and Child Health at {facilityName} </div>
            <RMNCHTable/>
          </div>

        </div>
      </div>
    )
  }
}