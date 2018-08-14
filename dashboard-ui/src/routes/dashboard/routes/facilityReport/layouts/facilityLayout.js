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
    onGetFacilityInfo(id, period)
  }

  render() {
    const {facilityFeature} = this.props
    const features = {'type': 'FeatureCollection', 'features': [facilityFeature]}
    const facilityName = 'Iringa Regional Hospital'
    const districtName = 'Iringa Urban'
    const regionName = 'Iringa'
    const reportPeriod = 'October 2017'
    const totalPopulation = '13,944'
    const totalFacilities = '8'

    return (
      <div>
        <div className="facility-report-container">
          <div className="report-header">
            <div className="facility-name">{facilityName}</div>
            <div className="report-period">{reportPeriod}</div>
          </div>
          <div className="population-box">
            <div className="info">
              <div className="sub-title">Availability of Health Services in {regionName} region</div>
              <div className="total-pop"><span>{totalPopulation}</span> Total Population</div>
              
              <div className="total-pop"><span>{totalFacilities}</span> Total Hospitals</div>
              <div className="ages">
                <div className="value-item"><div>Public</div><div>4</div></div>
                <div className="value-item"><div>Private</div><div>2</div></div>
                <div className="value-item"><div>Faith-Based</div><div>2</div></div>
              </div>

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

            </div>
            <div className="map">
              {/*<D3Map width="300" height="300" colors={["#FF8C42", '#0C4700']} features={features}></D3Map>*/}
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