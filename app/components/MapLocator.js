import React from 'react';
import Formsy from 'formsy-react';
import mapboxgl from 'mapbox-gl';
import Geocode from './Geocode';

var MapLocator = React.createClass({
	mixins: [Formsy.Mixin],
	// componentWillReceiveProps(nextProps){
	// 	if(nextProps.location != this.props.location){
	// 		this.map.flyTo({center: [nextProps.location.lat, nextProps.location.lng], zoom: 16});
	// 	}
		
	// },
	// changeValue: function(lat, lng){
	// 	this.setValue(event.currentTarget.value);
	// },
	updateCoords(data){
		//console.log("updating");
		//console.log(data);
		this.setValue({lat: data.coords.lat, lng: data.coords.lng});
		this.map.flyTo({center: [data.coords.lat, data.coords.lng], zoom: 16});
	},
	componentDidMount(){
		//console.log("calling component mount");
		//console.log(this.props);
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
	componentWillReceiveProps(nextProps){
		//console.log("locator received props");
		//console.log(nextProps);
	},
	render() {
		//console.log("rerendering maplocator");
	    return (
	    	<div>
	    	<label>{this.props.label}</label>
              <div id='map-container'>
              	<div id='map'/>
              	<img id='pin' src="/img/pin-flat.png" alt="pin" height="40" width="25"/>
              	<Geocode coords={this.getValue()} querystring={this.props.direccion} updateCoords={this.updateCoords}/>
              	<div id='block-text'/>
              </div>
             </div>
	    );
  }
});

export default MapLocator;