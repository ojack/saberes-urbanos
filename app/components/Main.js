import React from 'react';
import BaseMap from './BaseMap';
import HexGrid from './HexGrid';
import Navigation from './Navigation';

// ne:
// lat: 4.838602784913988
// lng: -73.91643370363467

// sw: 
// lat: 4.5155410235603455
// lng: -74.16126694164626

var Main = React.createClass({
getInitialState(){
	var sw = new mapboxgl.LngLat(-74.16126694164626, 4.5155410235603455);
	var ne = new mapboxgl.LngLat( -73.91643370363467, 4.838602784913988);
	var bounds = new mapboxgl.LngLatBounds(sw, ne);
		return ({bounds: bounds, mapLoaded: false});
},
showElements(){
	this.setState({mapLoaded: true});
},
	setBounds(bbox){
		var ne = new mapboxgl.LngLat(bbox[0], bbox[1]);
		var sw = new mapboxgl.LngLat(bbox[2], bbox[3]);
		var bounds = new mapboxgl.LngLatBounds(sw, ne);
		this.setState({bounds: bounds});
	},
  render() {
  	var mapElements = [];
  	if(this.state.mapLoaded){
  		//mapElements.push(<HexGrid/>);
  		mapElements.push(<Navigation setBounds={this.setBounds}/>);
  	}
  	  return(<div>
  	  			<BaseMap bounds={this.state.bounds} onMapLoaded={this.showElements}/>
  	  			{mapElements}
  	  			
  	  		</div>)
   	}
  
});

export default Main;