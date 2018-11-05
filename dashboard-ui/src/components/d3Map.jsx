import React from 'react'
import './map.css'

import * as d3 from 'd3'
import * as d3T from 'd3-tile'
import {imagesToBase64, toDataURL} from '../api'
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
    var pi = Math.PI,
      tau = 2 * pi;
    const parent = this;
    const element = this.refs.mapElement
    const width = this.props.width || defWidth
    const height = this.props.height || defHeight

    const {
      shapeStrokeWidth = '1',
      shapeStrokeColor = '#1997fe',
      shapeFillOpacity = '1',
      pointSize = '6',
      pointStrokeWidth = '1',
      pointStrokeColor = '#6C8EAD',
      pointFillColor = '#6C8EAD'
    } = this.props

    const colors = this.props.colors
      ? this.props.colors.map(it => d3.rgb(it))
      : [d3.rgb("#FFF275"), d3.rgb('#6C8EAD')];
    const color = d3.scaleLinear().domain([0, shapeFeatures.features.length]).interpolate(d3.interpolateHcl).range(colors);

    var projection = d3.geoMercator().scale(1 / tau).translate([0, 0])

    var path = d3.geoPath().projection(projection);
    var tile = d3T.tile().size([width, height]);

    //remov all previous
    d3.select(element).selectAll("svg").remove();

    var svg = d3.select(element).append("svg").attr("width", width).attr("height", height);
    var raster = svg.append("g");
    var vector = svg.append("g")

    const tooltip = d3.select('.tooltip').empty()
      ? d3.select("body").append("div")
      : d3.select('.tooltip');
    tooltip.attr("class", "tooltip").style("opacity", 0);

    // Compute the projected initial center.
    var center = projection(d3.geoCentroid(shapeFeatures || pointFeatures));

    var bounds = path.bounds(shapeFeatures || pointFeatures),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = .9 / Math.max(dx / width, dy / height);

    var zoom = d3.zoom().scaleExtent([
      1 << 10,
      1 << 25
    ]).on("zoom", zoomed);

    svg.call(zoom).call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(scale).translate(-center[0], -center[1]));

    if (!this.props.zoomeable) {
      svg.on('.zoom', null);
    }
    function zoomed() {
      var transform = d3.event.transform;
      var tiles = tile.scale(transform.k).translate([transform.x, transform.y])();
      projection.scale(transform.k / tau).translate([transform.x, transform.y]);

      var image = raster.attr("transform", stringify(tiles.scale, tiles.translate)).selectAll("image").data(tiles, function(d) {
        return d;
      });

      image.exit().remove();
      image.enter().append("image").attr("xlink:href", function(d) {
        return "http://" + "abc" [d[1] % 3] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
      }).attr("x", function(d) {
        return d[0] * 256;
      }).attr("y", function(d) {
        return d[1] * 256;
      }).attr("width", 256).attr("height", 256);

      vector.selectAll("path").remove()
      vector.selectAll("path").data(shapeFeatures.features).enter().append("path").attr("d", path).attr('fill', (d, idx) => color(idx)).attr('fill-opacity', shapeFillOpacity).attr('class', 'clickeable').attr('stroke', shapeStrokeColor).attr('stroke-width', shapeStrokeWidth).on('click', (d) => {
        tooltip.style("opacity", 0);
        parent.props.onFeatureClick(d)
      }).on('mouseover', (d) => {
        tooltip.html('<div>' + d.properties['NAME'] + '</div>').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
        tooltip.style("opacity", .9)
      }).on('mousemove', (d) => {
        tooltip.style("left", (d3.event.pageX + 10) + "px").style("top", (d3.event.pageY - 28) + "px")
      }).on('mouseout', (d) => {
        tooltip.style("opacity", 0);
      });

      if (pointFeatures) {
        vector.selectAll("circle").remove()
        vector.selectAll("circle").data(pointFeatures.features).enter().append("circle").attr("cx", d => projection(d.geometry.coordinates)[0]).attr("cy", d => projection(d.geometry.coordinates)[1]).attr('class', 'clickeable').attr("r", pointSize).attr("fill", (d) => d.properties.fillColor || pointFillColor).attr('stroke', (d) => d.properties.strokeColor || pointStrokeColor).attr('stroke-width', pointStrokeWidth).on('click', (d) => {
          parent.props.onPointClick(d)
        }).on('mouseover', (d) => {
          console.log('mouseover')
          tooltip.html('<div>' + d.properties['NAME'] + '</div>').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
          tooltip.style("opacity", .9)
        }).on('mousemove', (d) => {
          tooltip.style("left", (d3.event.pageX + 10) + "px").style("top", (d3.event.pageY - 28) + "px")
        }).on('mouseout', (d) => {
          tooltip.style("opacity", 0);
        })
      }

    }

    function stringify(scale, translate) {
      var k = scale / 256,
        r = scale % 1
          ? Number
          : Math.round;
      return "translate(" + r(translate[0] * scale) + "," + r(translate[1] * scale) + ") scale(" + k + ")";
    }
  }

  render() {
    
    const {shapeFeatures, pointFeatures, children} = this.props
    return (<div className="map-container" ref="mapElement">
      {
        shapeFeatures || pointFeatures
          ? ""
          : "No Data"
      }
      {this.props.children}
    </div>)
  }
}

export default D3Map
