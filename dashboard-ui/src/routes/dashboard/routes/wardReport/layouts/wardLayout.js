import React from 'react'
import PropTypes from "prop-types"
import D3Map from '../../../../../components/d3Map.jsx'
import TopTenDeseases from '../../facilityReport/layouts/topTenDeseasesTable'

export default class WardLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { onGetWardInfo, params: {id, period} } = this.props;
    onGetWardInfo(id, period)
  }

  render() {
    const {wardFeature} = this.props
    const features = {'type': 'FeatureCollection', 'features': [wardFeature]}
    const wardName = wardFeature.properties.NAME
    const reportPeriod = 'August-October 2017'
    const totalPopulation = '13,944'
    const totalFacilities = '4'

    debugger
    return (
      <div>
	      <div className="ward-report-container">
          <div className="report-header">
            <div className="ward-name">{wardName}</div>
            <div className="report-period">{reportPeriod}</div>
          </div>
          <div className="population-box">
            <div className="info">
              <div className="sub-title">Availability of Health Services in {wardName}</div>
              <div className="total-pop"><span>{totalPopulation}</span> Total Population</div>
              <div className="villages">
                <div className="value-item"><div>Pahi</div><div>6,169</div></div>
                <div className="value-item"><div>Potea</div><div>2,402</div></div>
                <div className="value-item"><div>Salare</div><div>1,614</div></div>
                <div className="value-item"><div>Kiteo</div><div>3,759</div></div>
              </div>
              <div className="gender">
                <div className="value-item"><div>Male</div><div>6,670</div></div>
                <div className="value-item"><div>Female</div><div>7,730</div></div>
              </div>
              <div className="ages">
                <div className="value-item"><div>{'Age <5'}</div><div>1,450</div></div>
                <div className="value-item"><div>{'Age 5-60'}</div><div>11,730</div></div>
                <div className="value-item"><div>{'Age >60'}</div><div>730</div></div>
              </div>

              <div className="total-pop"><span>{totalFacilities}</span> Total Health Facilities</div>
              <div className="ages">
                <div className="value-item"><div>Public</div><div>2</div></div>
                <div className="value-item"><div>Private</div><div>1</div></div>
                <div className="value-item"><div>Faith-Based</div><div>1</div></div>
              </div>

            </div>
            <div className="map">
              <D3Map width="300" height="300" colors={["#FF8C42", '#0C4700']} features={features}></D3Map>
            </div>
          </div>

          <div className="human-resources-box">
            <div className="sub-title">Human Resources for Health in {wardName}</div>
            <div className="total-pop"><span>{'41'}</span> Total Staffing Level at {wardName} Facilities</div>
            <div className="value-item"><div>Pahi</div><div>14</div></div>
            <div className="value-item"><div>Potea</div><div>16</div></div>
            <div className="value-item"><div>Kiteo</div><div>11</div></div>
            <div className="total-pop"><span>{'7'}</span> Community Health Workers in {wardName}</div>            
          </div>

          <div className="top-ten-deseases">
            <div className="sub-title">Out-Patient Diseases (OPD), All {wardName} Facilities</div>
            <TopTenDeseases/>
          </div>

          <div className="deaths-box">
            <div className="sub-title">Deaths in {wardName}</div>
            <div>
              <div className="total-pop"><span>{'365'}</span> Total Deaths</div>
              <div className="value-item"><div>Male</div><div>205</div></div>
              <div className="value-item"><div>Female</div><div>160</div></div>
              <div className="value-item"><div>{'Age <5'}</div><div>65</div></div>
              <div className="value-item"><div>{'Age 5-60'}</div><div>175</div></div>
              <div className="value-item"><div>{'Age >60'}</div><div>125</div></div>
            </div> 
            <div>
              <div className="total-pop"><span>{'260'}</span> Facility Deaths</div>
              <div className="value-item"><div>Pahi</div><div>160</div></div>
              <div className="value-item"><div>Potea</div><div>45</div></div>
              <div className="value-item"><div>Kiteo</div><div>55</div></div>
            </div> 
            <div>
              <div className="total-pop"><span>{'105'}</span> Community Deaths</div>
              <div className="value-item"><div>Pahi</div><div>30</div></div>
              <div className="value-item"><div>Potea</div><div>45</div></div>
              <div className="value-item"><div>Salare</div><div>10</div></div>
              <div className="value-item"><div>Kiteo</div><div>20</div></div>
            </div> 
          </div>
          {/*}
          <PieChart
            size={100}
            data={[
              { key: 'A', value: 100, color: '#aaac84' },
              { key: 'B', value: 200, color: '#dce7c5' },
              { key: 'C', value: 50, color: '#e3a51a' }
            ]}
          />*/}
        </div>
	    </div>
    )
  }
}