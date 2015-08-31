import React from 'react';
import mapboxgl from 'mapbox-gl';
import request from 'superagent';
import mapStyle from './data/light-v7-edit.json'

var BaseMap = React.createClass({
	getInitialState(){
		return({coords: {
	         lat: 4.597,
	         lng: -74.09
	     }, sitios: null, 
	     mapLoaded: false, 
	     dataLoadedToMap: false});
	},
	addGeoJSON(){
		//only load data if map has been initialized, data has been received, and data has no already been loaded
		if(this.state.sitios != null && this.state.mapLoaded && !this.state.dataLoadedToMap){
			console.log("adding data");
			console.log(this.state.sitios);
			 this.map.addSource("markers", {
			    "type": "geojson",
			   // "data": this.state.sitios,
			    "data": {
			      "type": "FeatureCollection",
			      "features": this.state.sitios
			      // "features": [{
			      //   "type": "Feature",
			      //   "geometry": {
			      //     "type": "Point",
			      //     "coordinates": [-77.03238901390978, 38.913188059745586]
			      //   },
			      //   "properties": {
			      //     "title": "Mapbox DC",
			      //     "marker-symbol": "monument"
			      //   }
			      // }, {
			      //   "type": "Feature",
			      //   "geometry": {
			      //     "type": "Point",
			      //     "coordinates": [-122.414, 37.776]
			      //   },
			      //   "properties": {
			      //     "title": "Mapbox SF",
			      //     "marker-symbol": "harbor"
			      //   }
			      // }]
			    }
			  });

			  this.map.addLayer({
			    "id": "markers",
			    "type": "symbol",
			    "source": "markers",
			    "layout": {
			      "icon-image": "default_marker",
			      "text-field": "{respuesta}",
			      "text-font": "Open Sans Semibold, Arial Unicode MS Bold",

			     // "text-offset": [0, 0.6],
			      "text-anchor": "left",
			      "text-justy": true,
			      "text-optional": true
			    },
			    "paint": {
			      "text-size": 18,
			       "text-halo-color": "#000",
			       "text-halo-width": 4,
			        "text-color": "#fff"
			    }
			  });
			  setTimeout(function(){
				this.map.flyTo({
					zoom: 11,
					pitch: 45,
					speed: 0.7, 
					bearing: 100,
					curve: 1,
		 			easing: function(t) {
		    			return t;
		  			}
				});
			}.bind(this), 400);
		}

	},
	componentDidMount(){
		console.log("calling component mount");
		console.log(this.props);
		request
		   .get('/api/sitios')
		   .query({ limit: 50 })
		   .end(function(err, res){
		   		console.log(res.body);
		   		this.setState({sitios: res.body}, this.addGeoJSON);
		   }.bind(this));
		mapboxgl.accessToken = 'pk.eyJ1Ijoib2oiLCJhIjoiSEw0cDJaNCJ9.9ffK1AU2O26zvS5Zsa6eqw';
		this.map = new mapboxgl.Map({
		  container: 'map-fullscreen', // container id
		  style: mapStyle, //stylesheet location
		 // style: lightMapStyle,
		  center: [this.state.coords.lat, this.state.coords.lng], // starting position
		  zoom: 5, // starting zoom
		  pitch: 45
		});
		
		//this.map.rotateTo(100);
		// Add zoom and rotation controls to the map.
		this.map.addControl(new mapboxgl.Navigation());
		this.map.on('style.load', function() {
			this.setState({mapLoaded: true}, this.addGeoJSON);
			/*if(this.props.localidadData!=null){
		 	this.loadMapData(this.props.localidadData);
		}*/
			//this.loadMapData(LOCALIDAD_DATA);
		}.bind(this));
		this.map.on('mousemove', function(e) {
	      this.map.featuresAt(e.point, {radius: 5}, function(err, features) {
	          if (err) throw err;
	          if(features.length > 0){
	         	console.log(features);
	         }
	      });
  	}.bind(this));
		// this.map.on('move', function() {
		// 	var coords = this.map.getCenter();
		// 	this.setState({coords: {lat: coords.lat, lng: coords.lng}});
		// // }.bind(this));
		// this.map.flyTo
		
	},
	render() {
		//console.l	<label>{this.props.label}</label>og("rerendering maplocator");
	    return (
              <div id='map-container-fullscreen'>
              	<div id='map-fullscreen'/>
              </div>
	    );
  }
});

export default BaseMap;