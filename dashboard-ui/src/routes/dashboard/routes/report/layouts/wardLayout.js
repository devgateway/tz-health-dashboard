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
    const { onGetWardInfo, onGetWardPopulation, onGetWardDiagnoses,onGetWardRMNCH, params: {id, period} } = this.props;
    onGetWardInfo(id, period)
    onGetWardPopulation(id, period)
    onGetWardDiagnoses(id, period)
    onGetWardRMNCH(id,period)
  }

  componentDidUpdate(prevProps) {
    if (this.props.info.getIn(['id']) !== prevProps.info.getIn(['id'])) {
      const { onGetMapPoints, onGetMapShape, info } = this.props;
      onGetMapPoints(info)
      onGetMapShape(info)
    }
  }

  onChangePeriod(period){
    const {params: {id}} = this.props
    this.context.router.history.push(`/report/ward/${id}/${period}`)
  }

  render() {

    const {params: {id}, mapShape, mapPoints, info, population, period} = this.props



    const facilitiesFeatures = []
    const wardFacilities = []
    if (mapPoints) {
      mapPoints.forEach(f => {
        facilitiesFeatures.push({properties: {ID: f.get('id'), NAME: f.get('name'), fillColor: f.getIn(['ward', 'gid']) == id ? '#980707' : null, strokeColor: '#57595d'}, geometry: f.get('point').toJS()})
        if (f.getIn(['ward', 'gid']) == id) {
          wardFacilities.push(f.toJS())
        }
      })
    }

    //totals by ownership types
    const totalPrivate = wardFacilities.filter(f => f.ownership.dhis2Id === 'UE4MHrqMzfd').length
    const totalFaithBased = wardFacilities.filter(f => f.ownership.dhis2Id === 'rj0MuRMJYCj').length
    const totalPublic = wardFacilities.filter(f => f.ownership.dhis2Id === 'm16TP0k7LVw').length
    const totalParastatal = wardFacilities.filter(f => f.ownership.dhis2Id === 'G6Mg194YpDy').length
    const totalDefence = wardFacilities.filter(f => f.ownership.dhis2Id === 'iTwLKcbi6BX').length

    const pointFeatures = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
    const wardName = info.getIn(['name'])
    const districtName = info.getIn(['district', 'name'])
    const regionName = info.getIn(['region', 'name'])

    return (
      <div>
        <div className="report-header">
          <div className="ward-name">{wardName}</div>
          <PeriodSelector period={this.props.params.period} onChangePeriod={e => this.onChangePeriod(e)}/>
        </div>
        <div className="ward-report-container">
          <div className="location-box">
            <div><div className="location-title">Ward</div><div className="location-value">{wardName}</div></div>
            <div><div className="location-title">District</div><div className="location-value">{districtName}</div></div>
            <div><div className="location-title">Region</div><div className="location-value">{regionName}</div></div>
          </div>
          <div className="population-box">
            <div>
              <div className="info">
                <div className="sub-title">Availability of Health Services in {wardName} ward</div>
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
              <div className="info">
                <div className="total-pop"><span>{wardFacilities.length}</span> Total Health Facilities</div>

                <div className="ages">
                  <div className="value-item"><div>{'Public'}</div><div>{totalPublic}</div></div>
                  <div className="value-item"><div>{'Private'}</div><div>{totalPrivate}</div></div>
                  <div className="value-item"><div>{'Faith Based'}</div><div>{totalFaithBased}</div></div>
                  <div className="value-item"><div>{'Parastatal'}</div><div>{totalParastatal}</div></div>
                  <div className="value-item"><div>{'Defence'}</div><div>{totalDefence}</div></div>
                </div>
              </div>
            </div>
            <div className="map">
              {mapShape.getIn(['features']) ?
                <D3Map width="600" height="460" colors={["#FF8C42", '#0C4700']} shapeFillOpacity="0" shapeStrokeWidth='2' shapeStrokeColor="#9C8568" shapeFeatures={mapShape.toJS()} pointFeatures={pointFeatures} showBasemap={true}></D3Map>
              : null}
              <div className="legend-box">
                <div className="legend-title">Legend</div>
                <div className="legend-item">
                  <div className="current-icon"/>
                  <div className="legend-name">Facility in {wardName} ward</div>
                </div>
                <div className="legend-item">
                  <div className="other-icon"/>
                  <div className="legend-name">Facility in other ward</div>
                </div>
                <div className="legend-item">
                  <div className="boundary-icon"/>
                  <div className="legend-name">Ward boundary</div>
                </div>
              </div>
            </div>
          </div>
          <div className="top-ten-deseases">
            <TopTenDeseases  period={period}  facilityName={wardName} diagnoses={this.props.diagnoses}/>
          </div>
          <div className="RMNCH-box">
            <div className="sub-title">Reproductive Maternal, Newborn and Child Health at {wardName} </div>
            <RMNCHTable  period={period}  facilityName={wardName} RMNCH={this.props.RMNCH}/>
          </div>

        </div>

            </div>
    )
  }
}
