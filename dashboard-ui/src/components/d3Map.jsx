import React from 'react'
import './map.css'

import * as d3 from 'd3'
import * as d3T from 'd3-tile'

const defWidth = 400,
  defHeight = 300;

class D3Map extends React.Component {

  componentWillReceiveProps(nexProps) {
    if (nexProps.shapeFeatures || nexProps.pointFeatures) {
      this.generateMap(nexProps.shapeFeatures, nexProps.pointFeatures)
    }
  }

  componentDidMount() {
    if (this.props.shapeFeatures || this.props.pointFeatures) {
      this.generateMap(this.props.shapeFeatures, this.props.pointFeatures)
    }
  }

  generateMap(shapeFeatures, pointFeatures) {
    const parent = this;
    const element = this.refs.mapElement
    const width = this.props.width || defWidth
    const height = this.props.height || defHeight
    const {
      shapeStrokeWidth = '1', 
      shapeStrokeColor = '#1997fe', 
      shapeFillOpacity = '1' , 
      pointSize = '6', 
      pointStrokeWidth = '1', 
      pointStrokeColor = '#6C8EAD', 
      pointFillColor = '#6C8EAD'
      } = this.props

    const colors = this.props.colors
      ? this.props.colors.map(it => d3.rgb(it))
      : [d3.rgb("#FFF275"), d3.rgb('#6C8EAD')];

    const center = d3.geoCentroid(shapeFeatures || pointFeatures)
    const scale = 2900;
    const scale0 = (width - 1) / 2 / Math.PI;
    const offset = [
      width / 2,
      height / 2
    ];
    const projection = d3.geoMercator().scale(scale).fitExtent([[20, 20], [width, height]], shapeFeatures || pointFeatures);
    
    const path = d3.geoPath().projection(projection);
    const color = d3.scaleLinear().domain([0, shapeFeatures.features.length]).interpolate(d3.interpolateHcl).range(colors);

    d3.select(element).select('svg').remove()

    const svg = d3.select(element).append("svg")
    svg.attr("width", width).attr("height", height)
    
    let basemap = null
    if (this.props.showBasemap) {
      const tiles = d3T.tile()
                  .size([width, height])
                  .scale(projection.scale() * 2 * Math.PI)
                  .translate(projection([0, 0]))
                  ()

      basemap = svg.selectAll("image")
        .data(tiles)
        .enter().append("image")
        .attr("xlink:href", function(d) { return `https://tile.openstreetmap.org/${d.z}/${d.x}/${d.y}.png`; })
        .attr("x", function(d) { return (d.x + tiles.translate[0]) * tiles.scale; })
        .attr("y", function(d) { return (d.y + tiles.translate[1]) * tiles.scale; })
        .attr("width", tiles.scale)
        .attr("height", tiles.scale)
    }

    const geoemetries = svg.append('g')

    const tooltip = d3.select('.tooltip').empty()
      ? d3.select("body").append("div")
      : d3.select('.tooltip');
    tooltip.attr("class", "tooltip").style("opacity", 0);

    if (shapeFeatures) {
      geoemetries.selectAll("path").data(shapeFeatures.features).enter().append("path")
        .attr("d", path)
        .attr('fill', (d, idx) => color(idx))
        .attr('fill-opacity', shapeFillOpacity)
        .attr('class', 'clickeable')
        .attr('stroke', shapeStrokeColor)
        .attr('stroke-width', shapeStrokeWidth)
        .on('click', (d) => {
          parent.props.onFeatureClick(d)
        }).on('mouseover', (d) => {
          tooltip.html('<div>' + d.properties['NAME'] + '</div>').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
          tooltip.style("opacity", .9)
        }).on('mousemove', (d) => {
          tooltip.style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px")
        }).on('mouseout', (d) => {
          tooltip.style("opacity", 0);
        })
    }

    if (pointFeatures) {
      geoemetries.selectAll("circle").data(pointFeatures.features).enter().append("circle")
        .attr("cx", d => projection(d.geometry.coordinates)[0])
        .attr("cy", d => projection(d.geometry.coordinates)[1])
        .attr('class', 'clickeable')
        .attr("r", pointSize)
        .attr("fill", (d) => d.properties.fillColor || pointFillColor)
        .attr('stroke', (d) => d.properties.strokeColor || pointStrokeColor)
        .attr('stroke-width', pointStrokeWidth)
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

    if (this.props.zoomeable) {
      const zoom = d3.zoom()
        .on('zoom', () => {
            if (this.props.showBasemap) { 
              basemap.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
              basemap.attr('transform', d3.event.transform)
            }
            geoemetries.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
            geoemetries.attr('transform', d3.event.transform) // updated for d3 v4
        })
      svg.call(zoom)
    }
  }

  render() {
    const {shapeFeatures, pointFeatures, children} = this.props
    return (<div className="map-container" ref="mapElement">
      {shapeFeatures || pointFeatures ? 
        ""
        :
         "No Data"
      }
      {this.props.children}
    </div>)
  }
}

export default D3Map
