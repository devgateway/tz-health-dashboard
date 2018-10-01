import React from 'react'
import PropTypes from "prop-types"
import D3Map from '../../../../../components/d3Map'
import TopTenDeseases from '../components/topTenDeseasesTable'
import RMNCHTable from '../components/RMNCHTable'
import PeriodSelector from '../components/periodSelector'

export default class WardLayout extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onGetFacilityInfo, onGetFacilityPopulation, onGetFacilityDiagnoses,onGetFacilityRMNCH, params: {id, period} } = this.props;
    onGetFacilityInfo(id, period)
    onGetFacilityPopulation(id, period)
    onGetFacilityDiagnoses(id, period)
    onGetFacilityRMNCH(id,period)
  }

  componentDidUpdate(prevProps) {
    if (this.props.info.getIn(['ward', 'id']) !== prevProps.info.getIn(['ward', 'id'])) {
      const { onGetMapPoints, onGetMapShape, info } = this.props;
      onGetMapPoints(info)
      onGetMapShape(info)
    }
  }

  onChangePeriod(period){
    const {params: {id}} = this.props
    this.context.router.history.push(`/report/facility/${id}/${period}`)
  }

  render() {
    const {params: {id}, mapShape, mapPoints, info, population,period} = this.props
    
    const facilitiesFeatures = []
    if (mapPoints) {
      mapPoints.map(f => facilitiesFeatures.push({properties: {ID: f.get('id'), NAME: f.get('name'), fillColor: f.get('id') == id ? '#980707' : null, strokeColor: '#57595d'}, geometry: f.get('point').toJS()}))
    }


    const pointFeatures = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
    const facilityName = info.getIn(['name'])
    const facilityType = info.getIn(['type', 'name'])
    const facilityTypeId = info.getIn(['type', 'dhis2Id'])
    const watdName = info.getIn(['ward', 'name'])
    const districtName = info.getIn(['district', 'name'])
    const regionName = info.getIn(['region', 'name'])

    return (
      <div>
        <div className="report-header">
          <div className="facility-name">{facilityName}</div>
          <PeriodSelector period={this.props.params.period} onChangePeriod={e => this.onChangePeriod(e)}/>
        </div>
        <div className="facility-report-container">
          <div className="location-box">
            <div><div className="location-title">Facility Type</div><div className="location-value">{facilityType}</div></div>
            <div><div className="location-title">Ward</div><div className="location-value">{watdName}</div></div>
            <div><div className="location-title">District</div><div className="location-value">{districtName}</div></div>
            <div><div className="location-title">Region</div><div className="location-value">{regionName}</div></div>
          </div>
          <div className="population-box">
            <div className="info">
              <div className="sub-title">Availability of Health Services in {regionName} region</div>
              <div className="total-pop"><span>{population.getIn(['data', 'total'])}</span> Total Population</div>

              <div className="ages">
                <div className="value-label"><div>by Gender</div></div>
                <div className="value-item"><div>Male</div><div>{population.getIn(['data', 'totalMale'])}</div></div>
                <div className="value-item"><div>Female</div><div>{population.getIn(['data', 'totalFemale'])}</div></div>
              </div>

              <div className="ages">
                <div className="value-label"><div>by Age</div></div>
                <div className="value-item"><div>{'<5'}</div><div>{population.getIn(['data', 'totalUnder5'])}</div></div>
                <div className="value-item"><div>{'5-60'}</div><div>{population.getIn(['data', 'total5to60'])}</div></div>
                <div className="value-item"><div>{'>60'}</div><div>{population.getIn(['data', 'totalAbove60'])}</div></div>
              </div>
            </div>
            <div className="map">
              {facilitiesFeatures.length > 0 && mapShape.getIn(['features']) ?
                <D3Map width="600" height="460" colors={["#FF8C42", '#0C4700']} shapeFillOpacity="0" shapeStrokeWidth='2' shapeStrokeColor="#9C8568" shapeFeatures={mapShape.toJS()} pointFeatures={pointFeatures} showBasemap={true}></D3Map>
              : null}
              <div className="legend-box">
                <div className="legend-title">Legend</div>
                <div className="legend-item">
                  <div className="current-icon"/>
                  <div className="legend-name">{facilityName}</div>
                </div>
                <div className="legend-item">
                  <div className="other-icon"/>
                  {facilityTypeId === "FgLhM6ea9dS" || facilityTypeId === "WK2vj3N9aA0" ? 
                    <div className="legend-name">{`Other ${facilityType} in same region`}</div>
                  :
                    <div className="legend-name">Other Facility in ward</div>
                  }                  
                </div>
                <div className="legend-item">
                  <div className="boundary-icon"/>
                  {facilityTypeId === "FgLhM6ea9dS" || facilityTypeId === "WK2vj3N9aA0" ? 
                    <div className="legend-name">District boundary</div>
                  :
                    <div className="legend-name">Ward boundary</div>
                  }                  
                </div>
              </div>
            </div>
          </div>

          <div className="top-ten-deseases">
            <TopTenDeseases  period={period}  facilityName={facilityName} diagnoses={this.props.diagnoses}/>
          </div>

          <div className="RMNCH-box">
            <div className="sub-title">Reproductive Maternal, Newborn and Child Health at {facilityName} </div>
            <RMNCHTable  period={period}  facilityName={facilityName} RMNCH={this.props.RMNCH}/>
          </div>

        </div>
      </div>
    )
  }
}
