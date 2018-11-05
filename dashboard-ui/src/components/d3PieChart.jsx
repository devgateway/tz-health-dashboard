import React from "react"
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import './d3Chart.css';

/**
 * Component that will display a Pie Chart using d3 library.
 *
 * Data is expected in the following format:
 * data: [
 *  {
 *    category: 'aaa',
 *    value: 1,
 *  },{
 *    category: 'bbb',
 *    value: 3,
 *  }, {
 *    category: 'ccc',
 *    value: 2,
 *  }
 * ]
 *
 * Example of running:
 *    <PieChart title={"Test Pie Chart"} width={600} height={400} data={d3PieChartData}
 *          chartClassName={"pie-chart"} legend={true}/>
 */
export default class PieChart extends React.Component {
  static propTypes = {
    chartClassName:   PropTypes.string.isRequired,
    height:           PropTypes.number.isRequired,
    width:            PropTypes.number.isRequired,
    data:             PropTypes.array.isRequired,
    title:            PropTypes.string,
    titlePosition:    PropTypes.string,
    numberFormat:     PropTypes.string,
    valueAccessor:    PropTypes.func,
    categoryAccessor: PropTypes.func,
    margin:           PropTypes.object,
    legend:           PropTypes.bool,
    isDonutChart:     PropTypes.bool,
    displayLabels:    PropTypes.bool,
    colors:           PropTypes.array,
  };

  static defaultProps = {
    chartClassName:   'pie-chart',
    titlePosition:    'top',
    width:            600,
    height:           400,
    numberFormat:     ",",
    valueAccessor:    d => d.value,
    categoryAccessor: d => d.category,
    margin:           {top: 20, right: 40, bottom: 20, left: 40},
    legend:           false,
    isDonutChart:     false,
    displayLabels:    false,
    colors:           ['#7CB5EC', '#90ED7D', '#F7A35C', '#8085E9', '#F15C80', '#E4D354', '#2B908F', '#F45B5B', '#91E8E1',
      '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92', '#434348']
  };

  lightenDarkenColor(col, amt) {
    let usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col,16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    let g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }

  _renderChart() {
    const data = this.props.data;

    // remove previous svg elements/charts
    d3.select("." + this.props.chartClassName + " svg").remove();
    // create SVG element
    const svg = d3.select("." + this.props.chartClassName)
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height)
      .attr('preserveAspectRatio', 'xMinYMin');
    const width = this.props.width - this.props.margin.left - this.props.margin.right;
    const height = this.props.height - this.props.margin.top - this.props.margin.bottom;
    const radius = Math.min(width, height) / 2;

    const g = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal()
      .range(this.props.colors);

    const donutWidth = 75;
    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(this.props.isDonutChart ? radius - donutWidth : 0);

    const labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const arcOver = d3.arc()
      .outerRadius(radius)
      .innerRadius(this.props.isDonutChart ? radius - donutWidth : 0);

    const pie = d3.pie()
      .sort(null)
      .value(this.props.valueAccessor);

    const chartWrapper = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    const that = this;
    chartWrapper.append("path")
      .attr("d", arc)
      .on("mouseover", function (d) {
        d3.select(this).transition()
          .duration(500)
          .style("fill", d => this.lightenDarkenColor(color(that.props.categoryAccessor(d.data)), -50))
          .attr("d", arcOver);

        // show the tooltip
        const category = that.props.categoryAccessor(d.data) + ":";
        const value = that.props.valueAccessor(d.data);
        const x = d3.event.clientX; // event.target.getBoundingClientRect().left
        const y = d3.event.clientY; // event.target.getBoundingClientRect().left
        d3.select('#tooltip').remove();
        d3.select("body").append('div').attr('gid', 'tooltip')
          .style("left", e => x + 'px')
          .style("top", e => y + 'px')
          .style("opacity", 1)
          .append("span").text(`${category} ${d3.format(that.props.numberFormat)(value)}`);
      })
      .on("mouseout", function (d) {
        d3.select(this).transition()
          .duration(500)
          .style("fill", d => color(that.props.categoryAccessor(d.data)))
          .attr("d", arc);

        // hide the tooltip
        d3.select('#tooltip').remove();
      })
      .on("mousemove", function(d) {
        const x = d3.event.clientX;
        const y = d3.event.clientY;
        d3.select('#tooltip').style("left", e => x + 'px').style("top", e => y + 'px');
      })
      .style("fill", d => color(this.props.categoryAccessor(d.data)));

    if (this.props.displayLabels) {
      chartWrapper.append("text")
        .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
        .attr("dy", ".35em")
        .text(d => this.props.categoryAccessor(d.data));
    }

    // attach a legend
    if (this.props.legend) {
      const legend = svg.append("g")
        .attr("class", "chart-legend")
        .attr("font-family", "sans-serif")
        .attr("font-size", 9)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(data.map(d => this.props.categoryAccessor(d)))
        .enter().append("g")
        .attr("transform", (d, i) => "translate(0," + i * 11 + ")");

      legend.append("rect")
        .style("fill", color)
        .attr("x", this.props.width - 10)
        .attr("width", 10)
        .attr("height", 10);

      legend.append("text")
        .attr("x", this.props.width - 15)
        .attr("y", 6)
        .attr("dy", "0.32em")
        .text(d => d);
    }
  };

  componentDidMount() {
    this._renderChart();
  }

  /**
   * Only render the component if the state changed
   */
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data);
  }

  render() {
    this._renderChart();
    const { chartClassName } = this.props;

    return (
      <did className={chartClassName}></did>
    );
  };
}
