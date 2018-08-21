import React from 'react'
import './map.css'

import * as d3 from 'd3'

const defWidth = 400,
  defHeight = 300;

class D3Map extends React.Component {

  componentWillReceiveProps(nexProps) {
    if (nexProps.features) {
      this.generateMap(nexProps.features, nexProps.pointFeatures)
    }
  }

  componentDidMount() {
    if (this.props.features) {
      this.generateMap(this.props.features, this.props.pointFeatures)
    }
  }

  generateMap(featureCollection, pointFeatures) {
    const parent = this;
    const {features} = featureCollection
    const element = this.refs.mapElement
    const width = this.props.width || defWidth
    const height = this.props.height || defHeight

    const colors = this.props.colors
      ? this.props.colors.map(it => d3.rgb(it))
      : [d3.rgb("#FFF275"), d3.rgb('#6C8EAD')];

    var center = d3.geoCentroid(featureCollection)
    var scale = 2900;
    var scale0 = (width - 1) / 2 / Math.PI;
    var offset = [
      width / 2,
      height / 2
    ];
    var projection = d3.geoMercator().scale(scale).fitExtent([
      [
        20, 20
      ],
      [
        width, height
      ]
    ], featureCollection);
    
    var path = d3.geoPath().projection(projection);
    var color = d3.scaleLinear().domain([0, features.length]).interpolate(d3.interpolateHcl).range(colors);

    d3.select(element).select('svg').remove()

    const svg = d3.select(element).append("svg")
    svg.attr("width", width).attr("height", height)

    const geoemetries = svg.append('g')

    const tooltip = d3.select('.tooltip').empty()
      ? d3.select("body").append("div")
      : d3.select('.tooltip');
    tooltip.attr("class", "tooltip").style("opacity", 0);

    geoemetries.selectAll("path").data(features).enter().append("path").attr("d", path).attr('fill', (d, idx) => color(idx)).attr('class', 'clickeable').attr('stroke', '#1997fe').on('click', (d) => {
      parent.props.onFeatureClick(d)
    }).on('mouseover', (d) => {
      console.log('mouseover')
      tooltip.html('<div>' + d.properties['NAME'] + '</div>').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
      tooltip.style("opacity", .9)
    }).on('mousemove', (d) => {
      tooltip.style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px")
    }).on('mouseout', (d) => {
      tooltip.style("opacity", 0);
    })

    if (pointFeatures) {
      geoemetries.selectAll("circle").data(pointFeatures).enter().append("circle")
        .attr("cx", d => projection(d.geometry.coordinates)[0])
        .attr("cy", d => projection(d.geometry.coordinates)[1])
        .attr('class', 'clickeable')
        .attr("r", "6px")
        .attr("fill", "#6C8EAD")
        .on('click', (d) => {parent.props.onPointClick(d)})
        .on('mouseover', (d) => {
          console.log('mouseover')
          tooltip.html('<div>' + d.properties['NAME'] + '</div>').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
          tooltip.style("opacity", .9)})
        .on('mousemove', (d) => {
          tooltip.style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px")})
        .on('mouseout', (d) => {
          tooltip.style("opacity", 0);})
        
    }
    const zoom = d3.zoom()
      .on('zoom', () => {
          geoemetries.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
          geoemetries.attr('transform', d3.event.transform) // updated for d3 v4
      })

    svg.call(zoom)
  }

  render() {
    return (<div className="map-container" ref="mapElement">
      {
        this.props.features
          ? ""
          : "No Data"
      }
      {this.props.children}
    </div>)
  }
}

export default D3Map
