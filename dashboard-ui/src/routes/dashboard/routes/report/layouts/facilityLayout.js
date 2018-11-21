import React from 'react'
import PropTypes from "prop-types"
import D3Map from '../../../../../components/d3Map.jsx'
import TopTenDeseases from '../components/topTenDeseasesTable'
import RMNCHTable from '../components/RMNCHTable'
import PeriodSelector from '../components/periodSelector'
import Legends from '../components/legends'
import {print} from '../utils/printUtil'
import {translate, Trans} from "react-i18next"
import {withRouter} from 'react-router-dom';
import {composePeriod} from '../../../../../api'

class WardLayout extends React.Component {

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

    if (this.props.info.getIn(['ward', 'gid']) !== prevProps.info.getIn(['ward', 'gid'])) {
      const { onGetMapPoints, onGetMapShape, info } = this.props;
      onGetMapPoints(info)
      onGetMapShape(info)
    }
  }

  onPointClick(f) {
    if (!f.properties.selected){
      const { ward, facility, period, params: {reportType} } = this.props
      const lan = this.props.i18n.language
      const strPeriod=composePeriod(period.toJS())
      this.props.history.push(`/${lan}/report/facility/${f.properties.ID}/`)
    }
}

  onChangePeriod(period){
    const {params: {id}} = this.props
    this.context.router.history.push(`/${this.props.lng}/report/facility/${id}/${period}`)
  }

  printReport(){
    print('facility', this.props)
  }

  render() {
    const {params: {id}, mapShape, mapPoints,mapRegion, info, population,period} = this.props

    const facilitiesFeatures = []
    if (mapPoints) {
      mapPoints.map(f => facilitiesFeatures.push({properties: {ID: f.get('id'), NAME: f.get('name'),
         fillColor: f.get('id') == id ? '#980707' : null,
         selected: f.get('id') == id ? true : false,
        strokeColor: '#57595d'}, geometry: f.get('point').toJS()}))
    }
    const pointFeatures = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
    const facilityName = info.getIn(['name'])
    const facilityType = info.getIn(['type', 'name'])
    const facilityTypeId = info.getIn(['type', 'dhis2Id'])
    const wardName = info.getIn(['ward', 'name'])
    const districtName = info.getIn(['district', 'name'])
    const regionName = info.getIn(['region', 'name'])

    const shapeFeatures = mapShape.toJS()
    let shapeStrokeColor = '#9C8568'
    let regionFeature
    if ((facilityTypeId === "FgLhM6ea9dS" || facilityTypeId === "WK2vj3N9aA0") && mapRegion.getIn(['features']) && mapShape.getIn(['features'])) {
      regionFeature = mapRegion.getIn(['features']).toJS()[0]
      Object.assign(regionFeature.properties, {strokeColor: '#9C8568'})
      shapeStrokeColor = '#6C8EAD'
      shapeFeatures.features.push(regionFeature)
    }

    let totalPopulation = 0
    let totalPopMale = 0
    let totalPopFemale = 0
    if (facilityTypeId === "FgLhM6ea9dS" || facilityTypeId === "WK2vj3N9aA0") {
      if (regionFeature) {
        totalPopulation = regionFeature.properties.POPULATION || 0
        totalPopMale = regionFeature.properties.POPULATION_MALE || 0
        totalPopFemale = regionFeature.properties.POPULATION_FEMALE || 0
      }
    } else {
      if (shapeFeatures.features) {
        totalPopulation = shapeFeatures.features[0].properties.POPULATION || 0
        totalPopMale = shapeFeatures.features[0].properties.POPULATION_MALE || 0
        totalPopFemale = shapeFeatures.features[0].properties.POPULATION_FEMALE || 0
      }
    }



    return (
      <div>
        <div className="report-header">
          <div className="facility-name">{facilityName}</div>
          <div className="print-icon" onClick={e => this.printReport()}></div>
          <PeriodSelector period={period} params={this.props.params}   onChangePeriod={e => this.onChangePeriod(e)}/>
        </div>
        <div className="facility-report-container">
          <div className="location-box">
            <div><div className="location-title"><Trans>Facility Type</Trans></div><div className="location-value"><Trans>{facilityType}</Trans></div></div>
            <div><div className="location-title"><Trans>Ward</Trans></div><div className="location-value">{wardName}</div></div>
            <div><div className="location-title"><Trans>District</Trans></div><div className="location-value">{districtName}</div></div>
            <div><div className="location-title"><Trans>Region</Trans></div><div className="location-value">{regionName}</div></div>
          </div>
          <div className="population-box">
            <div className="info">
              <div className="sub-title"><Trans>Availability of Health Services in</Trans> {regionName} <Trans>Region</Trans></div>
              <div className="total-pop"><span>{totalPopulation}</span> <Trans>Total Population</Trans></div>

              <div className="ages">
                <div className="value-label"><div><Trans>by Gender</Trans></div></div>
                <div className="value-item"><div><Trans>Male</Trans></div><div>{totalPopMale}</div></div>
                <div className="value-item"><div><Trans>Female</Trans></div><div>{totalPopFemale}</div></div>
              </div>
              <div className="population-disclaimer"><Trans>Source: census 2012</Trans></div>

              {/*}
              <div className="ages">
                <div className="value-label"><div><Trans>by Age</Trans></div></div>
                <div className="value-item"><div>{'<5'}</div><div>{population.getIn(['data', 'totalUnder5'])}</div></div>
                <div className="value-item"><div>{'5-60'}</div><div>{population.getIn(['data', 'total5to60'])}</div></div>
                <div className="value-item"><div>{'>60'}</div><div>{population.getIn(['data', 'totalAbove60'])}</div></div>
              </div>
              */}
            </div>
            <div className="map" id="map1">
              {facilitiesFeatures.length > 0 && mapShape.getIn(['features']) ?
                <D3Map selected={id} width="600" height="460" colors={["#FF8C42", '#0C4700']} shapeFillOpacity="0" shapeStrokeWidth='2' shapeStrokeColor={shapeStrokeColor}
                   shapeFeatures={shapeFeatures} pointFeatures={pointFeatures} showBasemap={true} zoomeable={true} onPointClick={d=>this.onPointClick(d)}></D3Map>
              : null}
              <Legends>
                <div>
                  <div className="legend-item">
                    <div className="current-icon"/>
                    <div className="legend-name">{facilityName}</div>
                  </div>
                  <div className="legend-item">
                    <div className="other-icon"/>
                    {facilityTypeId === "FgLhM6ea9dS" || facilityTypeId === "WK2vj3N9aA0" ?
                      <div className="legend-name"><Trans>Other</Trans> <Trans>{facilityType}</Trans> <Trans>in same region</Trans></div>
                    :
                      <div className="legend-name"><Trans>Other Facility in ward</Trans></div>
                    }
                  </div>
                  <div className="legend-item">
                    <div className="boundary-icon"/>
                    {facilityTypeId === "FgLhM6ea9dS" || facilityTypeId === "WK2vj3N9aA0" ?
                      <div className="legend-name"><Trans>Region boundary</Trans></div>
                    :
                      <div className="legend-name"><Trans>Ward boundary</Trans></div>
                    }
                  </div>
                  {facilityTypeId === "FgLhM6ea9dS" || facilityTypeId === "WK2vj3N9aA0" ?
                    <div className="legend-item">
                      <div className="district-boundary-icon"/>
                      <div className="legend-name"><Trans>District boundary</Trans></div>
                    </div>
                  : null}
                </div>
              </Legends>
            </div>
          </div>

          <div className="top-ten-deseases">
            <TopTenDeseases  type="facilities"  period={period} id={id}  facilityName={facilityName} diagnoses={this.props.diagnoses}/>
          </div>

          <div className="RMNCH-box">
            <RMNCHTable type="facilities"   period={period} id={id} facilityName={facilityName} RMNCH={this.props.RMNCH}/>
          </div>

        </div>
      </div>
    )
  }
}

export default translate("translations")(withRouter(WardLayout))
