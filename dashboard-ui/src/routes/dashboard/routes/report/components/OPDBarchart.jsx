import React from 'react';
import {getPeriodLabels} from '../utils/labelsUtil'
import i18n from '../../../../../i18n'
import {translate, Trans} from "react-i18next"

import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-basic.min';
const PlotlyComponent = createPlotlyComponent(Plotly);

export default class OPDChart extends React.Component {

  constructor(props) {
    super()
    this.state = {}
  }

  handleResize() {
    this.forceUpdate()
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  shouldComponentUpdate(nextProps, nextState) {
    const a = this.props.diagnoses.toJS()
    const b = nextProps.diagnoses.toJS()
    if (a.length != b.length) return true
    if (JSON.stringify(a) === JSON.stringify(b)) return false
    return true
  }

  wordWrap(str, maxWidth) {
    let newLineStr = "<br>"
    let done = false
    let res = ''
    const testWhite = (x) => {
      var white = new RegExp(/^\s$/);
      return white.test(x.charAt(0));
    }
    do {                    
      let found = false;
      // Inserts new line at first whitespace of the line
      for (let i = maxWidth - 1; i >= 0; i--) {
        if (testWhite(str.charAt(i))) {
          res = res + [str.slice(0, i), newLineStr].join('');
          str = str.slice(i + 1);
          found = true;
          break;
        }
      }
      // Inserts new line at maxWidth position, the word is too long to wrap
      if (!found) {
        res += [str.slice(0, maxWidth), newLineStr].join('');
        str = str.slice(maxWidth);
      }
      if (str.length < maxWidth) {
        done = true
      }
    } while (!done)
    return res + str
  }

  generateChartData(data) {
    const {period, diagnoses} = this.props
    const OPDData = diagnoses.get('data').toJS()
    const {prevLabel, currentLabel} = getPeriodLabels(period)
    const chartData = []
    const layout = {
      'showticklabels': false,
      'showgrid': true,
      'height': 400,

      'barmode': "stack",
      'showlegend': false,
      'legend': {
        visible: false
      },
      'margin':{
        't':10,
        'b':90,
        'l':60,
        'r':20
      },
      'title': '',
    }
    const config = {
      'modeBarButtonsToRemove': ['toImage', 'sendDataToCloud','hoverCompareCartesian', 'zoom2d', 'pan2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines'],
      'showLink': false,
      'displaylogo': false
    }
    OPDData.forEach((d, i)=> {
      let OPDLabel = ''
      const tr = d.diagnostic.translations.find(e => e.locale === i18n.language)
      if (tr && tr.value){
        OPDLabel = tr.value
      } else {
        OPDLabel = d.diagnostic.name
      }
      chartData.push({
        x: [`${OPDLabel} (${prevLabel})`, `${OPDLabel} (${currentLabel})`],
        y: [(d.ranges.totalUnder5Prev === -1 ? null : d.ranges.totalUnder5Prev), (d.ranges.totalUnder5 === -1 ? null : d.ranges.totalUnder5)],
        width: 0.6,
        //offset: -0.4,
        type: "bar",
        name: `${i18n.t('Age')}<5`, 
        xaxis: `x${i+1}`,
        showlegend: false,
        barmode: 'stack', 
        marker:{
          color: ['#EBA963', '#D16924']
        }
      })
      chartData.push({
        x: [`${OPDLabel} (${prevLabel})`, `${OPDLabel} (${currentLabel})`],
        y: [(d.ranges.total5to60Prev === -1 ? null : d.ranges.total5to60Prev), (d.ranges.total5to60 === -1 ? null : d.ranges.total5to60)],
        width: 0.6,
        //offset: -0.4,
        type: "bar",
        name: `${i18n.t('Age')}5-60`, 
        xaxis: `x${i+1}`,
        showlegend: false,
        barmode: 'stack', 
        marker:{
          color: ['#d5d6af', '#87894b']
        }
      })
      chartData.push({
        x: [`${OPDLabel} (${prevLabel})`, `${OPDLabel} (${currentLabel})`],
        y: [(d.ranges.totalAbove60Prev === -1 ? null : d.ranges.totalAbove60Prev), (d.ranges.totalAbove60 === -1 ? null : d.ranges.totalAbove60)],
        width: 0.6,
        //offset: -0.4,
        type: "bar",
        name: `${i18n.t('Age')}>60`, 
        xaxis: `x${i+1}`,
        showlegend: false,
        barmode: 'stack', 
        marker:{
          color: ['#CDB6BA', '#885d65']
        }
      })
      //Assign new xaxis to layout
      layout[(i === 0 ? 'xaxis' : `xaxis${i+1}`)] = {
        domain: [0.1*i, (0.1*(i+1))-0.02],
        anchor: `x${i+1}`,
        showticklabels: false,
        title: {
          text: this.wordWrap(OPDLabel, 20),
          font: {
            size: 11
          }
        }
      }
    })
    return {config, layout, data: chartData}
  }

  render() {
    const {period} = this.props
    const {prevLabel, currentLabel} = getPeriodLabels(period)
    const {layout, config, data} = this.generateChartData()
    const key = new Date().getTime()
    
    return (
      <div className="chart" ref="chartContainer">
        <div className="chart-legends">
          
          <div className="legend-group">
          <div class="legend-sub-group">  
          <div className="legend-color" style={{'background': '#EBA963'}}/><div className="legend-label">{`${i18n.t('Age')}<5 (${prevLabel})`}</div>
          <div className="legend-color" style={{'background': '#D16924'}}/><div className="legend-label">{`${i18n.t('Age')}<5 (${currentLabel})`}</div>
          </div>
          </div>
        
          <div className="legend-group">
          <div className="legend-sub-group">  
          <div className="legend-color" style={{'background': '#d5d6af'}}/><div className="legend-label">{`${i18n.t('Age')}5-60 (${prevLabel})`}</div>
          <div className="legend-color" style={{'background': '#87894b'}}/><div className="legend-label">{`${i18n.t('Age')}5-60 (${currentLabel})`}</div>
          </div>
          </div>
          
          <div className="legend-group">
          <div className="legend-sub-group">  
          <div className="legend-color" style={{'background': '#CDB6BA'}}/><div className="legend-label">{`${i18n.t('Age')}>60 (${prevLabel})`}</div>
          <div className="legend-color" style={{'background': '#885d65'}}/><div className="legend-label">{`${i18n.t('Age')}>60 (${currentLabel})`}</div>
          </div>
          </div>
          
        </div>
        {data.length === 0 ?
          <div className="no-chart-data"><Trans>No Data</Trans></div>
        :
          <PlotlyComponent
            key={key}
            data={data}
            layout={layout}
            config={config}/>
        }
      </div>
    );
  }
}


