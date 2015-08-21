import React from 'react';
import Formsy from 'formsy-react';
import mapboxgl from 'mapbox-gl';

var MapLocator = React.createClass({
	mixins: [Formsy.Mixin],
	componentWillReceiveProps(nextProps){
		if(nextProps.location != this.props.location){
			this.map.flyTo({center: [nextProps.location.lat, nextProps.location.lng], zoom: 16});
		}
		
	},
	// changeValue: function(lat, lng){
	// 	this.setValue(event.currentTarget.value);
	// },
	componentDidMount(){
		console.log("calling component mount");
		mapboxgl.accessToken = 'pk.eyJ1Ijoib2oiLCJhIjoiSEw0cDJaNCJ9.9ffK1AU2O26zvS5Zsa6eqw';
		this.map = new mapboxgl.Map({
		  container: 'map', // container id
		  style: 'https://www.mapbox.com/mapbox-gl-styles/styles/light-v7.json', //stylesheet location
		 // style: lightMapStyle,
		  center: [this.getValue().lat, this.getValue().lng], // starting position
		  zoom: 11, // starting zoom
		 // pitch: 45
		});
		this.map.rotateTo(100);
		// Add zoom and rotation controls to the map.
		this.map.addControl(new mapboxgl.Navigation());
		this.map.on('style.load', function() {
			/*if(this.props.localidadData!=null){
		 	this.loadMapData(this.props.localidadData);
		}*/
			//this.loadMapData(LOCALIDAD_DATA);
		}.bind(this));
		this.map.on('move', function() {
			var coords = this.map.getCenter();
			this.setValue({lat: coords.lat, lng: coords.lng});
		}.bind(this));
		
	},
	render() {
	    return (
              <div id='map-container'>
              	<div id='map'/>
              	<img id='pin' src="/img/pin-flat.png" alt="pin" height="40" width="25"/>
              	<div id='block-text'/>
              </div>
	    );
  }
});

export default MapLocator;