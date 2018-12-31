import React from 'react'
import PropTypes from "prop-types"
import D3Map from '../../../../../components/d3Map'
import TopTenDeseases from '../components/topTenDeseasesTable'
import RMNCHTable from '../components/RMNCHTable'
import PeriodSelector from '../components/periodSelector'
import Legends from '../components/legends'
import {print} from '../utils/printUtil'
import {translate, Trans} from "react-i18next"
import CopyShare from '../components/copyShareLink'
import i18n from '../../../../../i18n'
import {composePeriod,getWardFacilitiesDownloadURI} from '../../../../../api'
import BackButton from '../components/backButton'

class WardLayout extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {legendVisible: true};
  }

  componentDidMount() {
    const { onGetWardInfo, onGetWardPopulation, onGetWardDiagnoses,onGetWardRMNCH, params: {id, period} } = this.props;

    onGetWardInfo(id, period)
    onGetWardPopulation(id, period)
    onGetWardDiagnoses(id, period)
    onGetWardRMNCH(id,period)
    window.scrollTo(0, 0)
  }

  componentDidUpdate(prevProps) {
    if (this.props.info.getIn(['gid']) !== prevProps.info.getIn(['gid'])) {
      const { onGetMapPoints, onGetMapShape, info } = this.props;
      onGetMapPoints(info)
      onGetMapShape(info)
    }
  }

  onChangePeriod(period){

    const {params: {id}} = this.props
    let current = document.location.hash.substr(1)
    this.context.router.history.push(`/${this.props.lng}/report/ward/${id}/${period}`)
  }

  onToggleLegend(){
    this.setState({legendVisible: !this.state.legendVisible})
  }

  printReport(){
    print('ward', this.props)
  }

  render() {
    const {conf,params: {id}, mapShape, mapPoints, info, population, period, OPDView, onSetOPDView, RMNCHView, onSetRMNCHView} = this.props
    const lan = this.props.i18n.language
    const {legendVisible} = this.state
    const facilitiesFeatures = []
    const wardFacilities = []
    if (mapPoints) {
      mapPoints.forEach(f => {
        facilitiesFeatures.push({properties: {ID: f.get('id'), NAME: f.get('name'), fillColor: f.getIn(['ward', 'gid']) == id ? '#980707' : null, strokeColor: '#57595d'}, geometry: f.get('point').toJS()})
        if (f.getIn(['ward', 'gid']) == id) {
          if(f.get('ownership')==null){
            console.log("facility without ownership"+f.get('code'));
          }

          wardFacilities.push(f.toJS())
        }
      })
    }

    //totals by ownership types

    const totalPrivate = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'UE4MHrqMzfd').length
    const totalFaithBased = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'rj0MuRMJYCj').length
    const totalPublic = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'm16TP0k7LVw').length
    const totalParastatal = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'G6Mg194YpDy').length
    const totalDefence = wardFacilities.filter(f => f.ownership && f.ownership.dhis2Id === 'iTwLKcbi6BX').length
    const totalUndefined=  wardFacilities.filter(f => !f.ownership ).length
    debugger;

    const pointFeatures = {'type': 'FeatureCollection', 'features': facilitiesFeatures}
    const wardName = info.getIn(['name'])
    const districtName = info.getIn(['district', 'name'])
    const regionName = info.getIn(['region', 'name'])
    const shapeFeatures = mapShape.toJS()

    let totalPopulation = 0
    let totalPopMale = 0
    let totalPopFemale = 0
    if (shapeFeatures.features) {
      totalPopulation = shapeFeatures.features[0].properties.POPULATION || 0
      totalPopMale = shapeFeatures.features[0].properties.POPULATION_MALE || 0
      totalPopFemale = shapeFeatures.features[0].properties.POPULATION_FEMALE || 0
    }



    return (
      <div>
        <div className="report-header">
          <div className="ward-name">{wardName} <Trans>Ward</Trans></div>
          <div title={`${i18n.t('Print as PDF')}`} className="print-icon" onClick={e => this.printReport()}></div>

        <CopyShare/>
  <BackButton/>
        <PeriodSelector conf={conf} period={period} params={this.props.params} onChangePeriod={e => this.onChangePeriod(e)}/>
        </div>
        <div className="ward-report-container">
          <div className="location-box">
            <div><div className="location-title"><Trans>Ward</Trans></div><div className="location-value">{wardName}</div></div>
            <div><div className="location-title"><Trans>District</Trans></div><div className="location-value">{districtName}</div></div>
            <div><div className="location-title"><Trans>Region</Trans></div><div className="location-value">{regionName}</div></div>
          </div>
          <div className="population-box">
            <div>
              <div className="info">
                <div className="sub-title"><Trans>Availability of Health Services in</Trans> {wardName} <Trans>Ward</Trans></div>
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
              <div className="info">
                <div className="total-pop"><span>{wardFacilities.length}</span> <Trans>Total Health Facilities</Trans></div>

                <div className="types">
                  <div className="value-item"><div><Trans>Public</Trans></div><div>{totalPublic}</div></div>
                  <div className="value-item"><div><Trans>Private</Trans></div><div>{totalPrivate}</div></div>
                  <div className="value-item"><div><Trans>Faith Based</Trans></div><div>{totalFaithBased}</div></div>
                  <div className="value-item"><div><Trans>Parastatal</Trans></div><div>{totalParastatal}</div></div>
                  <div className="value-item"><div><Trans>Defense</Trans></div><div>{totalDefence}</div></div>
                  {totalUndefined >0?<div className="value-item"><div><Trans>Undefined</Trans></div><div>{totalUndefined}</div></div>:null}
                </div>
              </div>
            </div>
            <div className="map" id="map1">
              {mapShape.getIn(['features']) ?
                <D3Map width="600" height="460" colors={["#FF8C42", '#0C4700']} shapeFillOpacity="0" shapeStrokeWidth='2'
                  shapeStrokeColor="#9C8568" shapeFeatures={mapShape.toJS()} pointFeatures={pointFeatures} showBasemap={true}
                  zoomeable={true}></D3Map>
              : null}
              <Legends>
                <div>
                  <div className="legend-item">
                    <div className="current-icon"/>
                    <div className="legend-name"><Trans>Facility in</Trans> {wardName} <Trans>Ward</Trans></div>
                  </div>
                  <div className="legend-item">
                    <div className="other-icon"/>
                    <div className="legend-name"><Trans>Facility in other ward</Trans></div>
                  </div>
                  <div className="legend-item">
                    <div className="boundary-icon"/>
                    <div className="legend-name"><Trans>Ward boundary</Trans></div>
                  </div>
                </div>
              </Legends>

            </div>
          </div>
          <div className="download">
            <a className="csv" href={getWardFacilitiesDownloadURI('csv',info,lan)} target="_blank"></a>
            <a className="json" href={getWardFacilitiesDownloadURI('json',info,lan)} target="_blank"></a>
          </div>

          <TopTenDeseases
            type="wards"
            period={period} id={id}
            facilityName={wardName}
            onSetOPDView={onSetOPDView}
            OPDView={OPDView}
            diagnoses={this.props.diagnoses}/>

          <RMNCHTable
            type="wards"
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

export default translate("translations")(WardLayout)
