import React from 'react'
import PropTypes from "prop-types"
import D3Map from '../../../../../components/d3Map'
import TopTenDeseases from '../components/topTenDeseasesTable.jsx'
import RMNCHTable from '../components/RMNCHTable'

export default class WardLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onGetFacilityInfo, onGetFacilityPopulation, onGetFacilityDiagnoses, params: {id, period} } = this.props;
    onGetFacilityInfo(id)
    onGetFacilityPopulation(id)
    onGetFacilityDiagnoses(id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.info.ward.id !== prevProps.info.ward.id) {
      const { onGetMapPoints, onGetMapShape, info } = this.props;
      onGetMapPoints(info)
      onGetMapShape(info)
    }
  }


  render() {
    const {params: {id, period}, mapShape, mapPoints, info = {}, population = {}} = this.props
    const facilitiesFeatures = []
    if (mapPoints) {
      mapPoints.forEach(f => facilitiesFeatures.push({properties: {ID: f.id, NAME: f.name, fillColor: f.id == id ? '#980707' : null, strokeColor: '#57595d'}, geometry: f.point}))
    }
    const pointFeatures = {'type': 'FeatureCollection', 'features': facilitiesFeatures}

    const facilityName = info.name
    const facilityType = info.type.name
    const watdName = info.ward.name
    const districtName = info.district.name
    const regionName = info.region.name

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
              <div className="total-pop"><span>{population.data.total}</span> Total Population</div>

              <div className="ages">
                <div className="value-label"><div>by Gender</div></div>
                <div className="value-item"><div>Male</div><div>{population.data.totalMale}</div></div>
                <div className="value-item"><div>Female</div><div>{population.data.totalFemale}</div></div>
              </div>

              <div className="ages">
                <div className="value-label"><div>by Age</div></div>
                <div className="value-item"><div>{'<5'}</div><div>{population.data.totalUnder5}</div></div>
                <div className="value-item"><div>{'5-60'}</div><div>{population.data.total5to60}</div></div>
                <div className="value-item"><div>{'>60'}</div><div>{population.data.totalAbove60}</div></div>
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
            <TopTenDeseases diagnoses={this.props.diagnoses}/>
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
