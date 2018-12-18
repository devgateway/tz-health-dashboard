import React from 'react'
import PropTypes from 'prop-types'
import HighCharts from 'highcharts'

export default class ColumnChart extends React.Component {
	
	static contextTypes = {
    i18n: PropTypes.object,
    router: PropTypes.object
  }

  componentDidMount() {
  	//this.getChart(data)
    const {title, categories, series} = this.props
  	if (categories != null && series != null) {
    	this.getChart(title, categories, series)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {title, categories, series} = nextProps
    const newData = series.map(d => d.data)
    const oldData = this.props.series.map(d => d.data)
    if (newData != null && JSON.stringify(newData) !== JSON.stringify(oldData)) {
    	debugger
      this.getChart(title, categories, series)
    }
  }

  getChart(title, categories, series){
  	const {chartId} = this.props
  	this.chart = new HighCharts.Chart({
	  	chart: {
	      type: 'column',
	      renderTo: chartId,
        marginLeft: 75,
        animation: false
	    },

	    title: {
        text: title
	    },

	    xAxis: {
        categories: categories
	    },

	    yAxis: {
        allowDecimals: false,
        min: 0,
	        title: {
          text: null
        },
	    },

	    tooltip: {
        formatter: function () {
      		return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>' +
            this.series.userOptions.stack + '<br/>' +
            'Total: ' + this.point.stackTotal;
        }
	    },

	    plotOptions: {
        column: {
          stacking: 'normal'
        }
	    },

	    series: series
	  })
		return this.chart
  }

  render() {
		const {chartId} = this.props
	  return (
	    <div className="">
	    	<div>
          <div className="chart-container" id={chartId}></div>
        </div>
	    </div>
	  )
	}
}