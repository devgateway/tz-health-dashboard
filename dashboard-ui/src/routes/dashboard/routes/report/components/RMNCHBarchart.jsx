import React from 'react';
import {getPeriodLabels} from '../utils/labelsUtil'
import i18n from '../../../../../i18n'
import {translate, Trans} from "react-i18next"

import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-basic.min';
const PlotlyComponent = createPlotlyComponent(Plotly);

export default class RMNCHChart extends React.Component {

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
    const a = this.props.RMNCH.toJS()
    const b = nextProps.RMNCH.toJS()
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

  generateChartData() {
    const {period, RMNCH} = this.props
    const RMNCHData = RMNCH.get('data').toJS()
    const {prevLabel, currentLabel} = getPeriodLabels(period)
    const chartData = []
    const layout = {
      'showticklabels': false,
      'showgrid': true,
      'height': 400,
      'barmode': 'group',
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
    const RMNCHCategories = RMNCHData.map(d => { 
      const tr = d.indicator.translations.find(e => e.locale === i18n.language)
      if (tr && tr.value){
        return this.wordWrap(tr.value, 20)
      } else {
        return this.wordWrap(d.indicator.name, 20)
      } 
    })
    const data = [{
        x: RMNCHCategories,
        y: RMNCHData.map(d => d.totalPrevPeriod !== -1 ? d.totalPrevPeriod : 0),
        name: prevLabel,
        type: 'bar',
        marker:{
          color: '#F8C58C',
        },
    }, {
        x: RMNCHCategories,
        y: RMNCHData.map(d => d.value !== -1 ? d.value : 0),
        name: currentLabel,
        type: 'bar',
        marker:{
          color: '#FF8863',
        },
    }]
    return {config, layout, data}
  }

  render() {
    const {period} = this.props
    const {prevLabel, currentLabel} = getPeriodLabels(period)
    const {layout, config, data} = this.generateChartData()
    const key = new Date().getTime()
    
    return (
      <div className="chart" ref="chartContainer">
        <div className="chart-legends">
          <div className="legend-color" style={{'background': '#F8C58C'}}/><div className="legend-label">{prevLabel}</div>
          <div className="legend-color" style={{'background': '#FF8863'}}/><div className="legend-label">{currentLabel}</div>
        </div>
        {data[0].x.length === 0 && data[1].x.length === 0?
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


