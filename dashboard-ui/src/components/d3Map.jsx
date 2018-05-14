import React from 'react'
import './map.css'

import * as d3 from 'd3'

const defWidth=400,defHeight=300;





class D3Map extends React.Component {

  componentWillReceiveProps(nexProps) {
    if (nexProps.features) {
      this.generateMap(nexProps.features)
    }
  }



  generateMap(featureCollection) {
    const parent=this;
    const {features} = featureCollection
    const element = this.refs.mapElement
    const width = this.props.width  || defWidth
    const height = this.props.height || defHeight
    debugger;
    const colors = this.props.colors?this.props.colors.map(it=>d3.rgb(it)):[d3.rgb("#FFF275"), d3.rgb('#6C8EAD')];


    var center = d3.geoCentroid(featureCollection)
    var scale = 2900;
    var offset = [
      width / 2,
      height / 2
    ];
      var projection = d3.geoMercator().scale(scale).fitExtent([[20, 20], [width, height]], featureCollection);
      //.center(center).translate(offset);
    var path = d3.geoPath().projection(projection);
    var color = d3.scaleLinear().domain([0,features.length]) .interpolate(d3.interpolateHcl)
      .range(colors);



    d3.select(element).select('svg').remove()

    const svg = d3.select(element).append("svg")
    svg.attr("width", width).attr("height", height)


    const geoemetries=svg.append('g')

    geoemetries.selectAll("path")
    .data(features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr('fill',(d,idx)=>color(idx))
    .attr('class','clickeable')
    .attr('stroke','#1997fe')
    .on('click',(d)=>{
        parent.props.onFeatureClick(d)
    })
    .on('mouseover',(e)=>{})



  }

  render() {

    return (

      <div className="map-container" ref="mapElement">
      {this.props.children}
    </div>)
  }
}

export default D3Map
