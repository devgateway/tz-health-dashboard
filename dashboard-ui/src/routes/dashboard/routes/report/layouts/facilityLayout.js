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
import CopyShare from '../components/copyShareLink'
import BackButton from '../components/backButton'

import i18n from '../../../../../i18n'
import {composePeriod, getFacilitiesDownloadURI} from '../../../../../api'

class Layout extends React.Component {

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
    window.scrollTo(0, 0)
  }

  componentDidUpdate(prevProps) {
    if (this.props.info.getIn(['id']) !== prevProps.info.getIn(['id'])) {
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
    const lan = this.props.i18n.language
    this.context.router.history.push(`/${lan}/report/facility/${id}/${period}`)
  }

  printReport(){
    print('facility', this.props)
  }

  render() {
    const {conf,params: {id}, mapShape, mapPoints, mapBorder, info, population, period, OPDView, onSetOPDView, RMNCHView, onSetRMNCHView, typeMapping} = this.props
    const lan = this.props.i18n.language
    const facilitiesFeatures = []
    if (mapPoints) {
      mapPoints.map(f => facilitiesFeatures.push({properties: {ID: f.get('id'), NAME: f.get('name'),
         fillColor: f.get('id') == id ? '#980707' : null,
         selected: f.get('id') == id ? true : false,
        strokeColor: '#57595d'}, geometry: f.get('point').toJS()}))
    }
    const pointFeatures = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
    const facilityName = info.getIn(['name'])
    //const facilityTypeMapped = typeMapping.toJS().find(f => f.dhis2Id === info.getIn(['detailedType', 'dhis2Id'])) || {}
    const boundaryLevel = info.get('boundaryLevel')
    const facilityType = info.get('facilityType')
    //const facilityType = info.getIn(['type', 'name'])
    const facilityTypeId = info.getIn(['type', 'dhis2Id'])
    const wardName = info.getIn(['ward', 'name'])
    const districtName = info.getIn(['district', 'name'])
    const regionName = info.getIn(['region', 'name'])
    let shapeFeatures, borderFeature
    let shapeStrokeColor = '#6C8EAD'
    let shapeBoundary = null
    let admLevelName = wardName
    switch(boundaryLevel) {
      case 'region':
        admLevelName = regionName
        shapeBoundary = 'district'
        break;
      case 'district':
        admLevelName = districtName
        shapeBoundary = 'ward'
        break;
    }


    if (mapShape.getIn(['features'])) {
      shapeFeatures = mapShape.toJS()
      if (mapBorder.getIn(['features']) && mapShape.getIn(['features'])) {
        borderFeature = mapBorder.getIn(['features']).toJS()[0]
        Object.assign(borderFeature.properties, {strokeColor: '#9C8568'})
        shapeFeatures.features.push(borderFeature)
      }
    } else {
      shapeFeatures = {'type': 'FeatureCollection', 'features': []}
      if (mapBorder.getIn(['features'])) {
        borderFeature = mapBorder.getIn(['features']).toJS()[0]
        Object.assign(borderFeature.properties, {strokeColor: '#9C8568'})
        shapeFeatures.features.push(borderFeature)
      }
    }

    let totalPopulation = 0
    let totalPopMale = 0
    let totalPopFemale = 0
    if (borderFeature) {
      totalPopulation = borderFeature.properties.POPULATION || 0
      totalPopMale = borderFeature.properties.POPULATION_MALE || 0
      totalPopFemale = borderFeature.properties.POPULATION_FEMALE || 0
    }

    return (
      <div>
        <div className="report-header">
          <div className="facility-name">{facilityName}</div>


          <div title={`${i18n.t('Print as PDF')}`} className="print-icon" onClick={e => this.printReport()}></div>

        <CopyShare/>
        <BackButton/>

        <PeriodSelector conf={conf} period={period} params={this.props.params}   onChangePeriod={e => this.onChangePeriod(e)}/>
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
              <div className="sub-title"><Trans>Availability of Health Services</Trans></div>
              <div className="total-pop"><span>{totalPopulation}</span> <Trans>Total Population</Trans> <Trans>in</Trans> {regionName} <Trans>{boundaryLevel}</Trans></div>

              <div className="ages">
                <div className="value-label"><div><Trans>by Gender</Trans></div></div>
                <div className="value-item"><div><Trans>Male</Trans></div><div>{totalPopMale}</div></div>
                <div className="value-item"><div><Trans>Female</Trans></div><div>{totalPopFemale}</div></div>
              </div>
              <div className="population-disclaimer"><Trans>Source: census 2012</Trans></div>



                  {
                  population.getIn(['data','total']) > 0?<div>

                  <div className="ages">
                    <div className="total-pop"><span>{population.getIn(['data','total'])}</span> <Trans>Total population in facility catchment </Trans></div>
                    <div className="value-label"><div><Trans>by Age</Trans></div></div>
                    <div className="value-item"><div>{'<5'}</div><div>{population.getIn(['data', 'totalUnder5'])>-1?population.getIn(['data', 'totalUnder5']):0}</div></div>
                    <div className="value-item"><div>{'5-60'}</div><div>{population.getIn(['data', 'total5to60'])>-1?population.getIn(['data', 'total5to60']):0}</div></div>
                    <div className="value-item"><div>{'>60'}</div><div>{population.getIn(['data', 'totalAbove60'])>-1?population.getIn(['data', 'totalAbove60']):0}</div></div>
                  </div>

                    <div className="population-disclaimer"><Trans>Source: DHIS2</Trans></div>


                  </div>:null
                  }

            </div>
            <div className="map" id="map1">
              {facilitiesFeatures.length > 0 && shapeFeatures.features.length > 0 ?
                <D3Map selected={id} width="580" height="450" colors={["#FF8C42", '#0C4700']} shapeFillOpacity="0" shapeStrokeWidth='2' shapeStrokeColor={shapeStrokeColor}
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
                    <div className="legend-name"><Trans>Other</Trans> <Trans>{facilityType}</Trans> <Trans>in same {boundaryLevel}</Trans></div>
                  </div>
                  <div className="legend-item">
                    <div className="boundary-icon"/>
                    <div className="legend-name"><Trans>{boundaryLevel} boundary</Trans></div>          
                  </div>
                  {shapeBoundary ?
                    <div className="legend-item">
                      <div className="district-boundary-icon"/>
                      <div className="legend-name"><Trans>{shapeBoundary} boundary</Trans></div>
                    </div>
                  : null}
                </div>
              </Legends>

            </div>

          </div>
          <div className="download full">
            <a className="csv" href={getFacilitiesDownloadURI('csv',info,lan)} target="_blank"></a>
            <a className="json" href={getFacilitiesDownloadURI('json',info,lan)} target="_blank"></a>
          </div>

          <TopTenDeseases
            type="facilities"
            period={period} id={id}
            facilityName={wardName}
            onSetOPDView={onSetOPDView}
            OPDView={OPDView}
            diagnoses={this.props.diagnoses}/>

          <RMNCHTable
            type="facilities"
            period={period} id={id}
            facilityName={wardName}
            onSetRMNCHView={onSetRMNCHView}
            RMNCHView={RMNCHView}
            RMNCH={this.props.RMNCH}/>

        </div>
      </div>
    )
  }
}

export default translate("translations")(withRouter(Layout))
