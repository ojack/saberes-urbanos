import React from 'react';
//import mapboxgl from 'mapbox-gl';
import request from 'superagent';
import mapStyle from './data/light-v8.json'
import InfoWindow from './InfoWindow'

var BaseMap = React.createClass({
	getInitialState(){
		return({coords: {
	         lat: 4.597,
	         lng: -74.09
	     }, sitios: null, 
	     selected: null,
	     mapLoaded: false, 
	     dataLoadedToMap: false});
	},
	initSitios(sitios){
		var sit = sitios.map(function(obj, index){
			obj.properties.tempId = index;
			return obj;
		});
		this.setState({sitios: sit}, this.addGeoJSON);
	},
	updatePixelCoords(){
	if(this.state.sitios != null && this.state.mapLoaded){
		var sit = this.state.sitios.map(function(obj, index){
			
			obj.properties.screenCoords = this.map.project({lat: obj.geometry.coordinates[1], lng: obj.geometry.coordinates[0]});
			return obj;
		}.bind(this));
			this.setState({sitios: sit}, this.renderCanvas);
			//console.log(sit);
	}
	},
	renderCanvas(){
		this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
		for(var i = 0; i < this.state.sitios.length; i++){
			var obj = this.state.sitios[i];
			var size = 10;
			if(this.state.selected != null && obj.properties.tempId == this.state.selected.tempId){
				size = 20;
			}
			this.ctx.fillStyle = "#FF3366";
			//console.log(obj.properties.screenCoords.x);
			this.ctx.fillRect(Math.floor(obj.properties.screenCoords.x)-size/2, Math.floor(obj.properties.screenCoords.y)-size/2,size, size);
			//this.ctx.fillRect(i*10, i*10,8, 8);
			//this.ctx.fillRect(100,100, 8, 8);
		}
	},
	addGeoJSON(){
		//only load data if map has been initialized, data has been received, and data has no already been loaded
		if(this.state.sitios != null && this.state.mapLoaded && !this.state.dataLoadedToMap){
			
			console.log("adding data");
			// console.log(this.state.sitios);
			 this.map.addSource("markers", {
			    "type": "geojson",
			   // "data": this.state.sitios,
			    "data": {
			      "type": "FeatureCollection",
			      "features": this.state.sitios
			    }
			  });

			 this.map.addLayer({
			    "id": "markers",
			    "type": "symbol",
			    "source": "markers",
			    "interactive": true,
			    "layout": {
			     "icon-image": "default_marker",
			      // "text-field": "{respuesta}",
			      // "text-font": "Open Sans Semibold, Arial Unicode MS Bold",

			     // "text-offset": [0, 0.6],
			      "text-anchor": "left",
			      "text-justy": true,
			      "text-optional": true
			    },
			    "paint": {
			    	"icon-opacity": 0.05
			      // "text-size": 18,
			      //  "text-halo-color": "#000",
			      //  "text-halo-width": 4,
			      //   "text-color": "#fff"
			    }
			  });
			 
			


			 this.map.on('click', function(e) {
					console.log(e);
				// to do: scale radius based on zoom
			      this.map.featuresAt(e.point, {radius: 50}, function(err, features) {
			          if (err) console.log(err);
			          if(features.length > 0){
			          	//for(var i )
			         	console.log(e.point);
			         	this.setState({selected: features[0].properties}, this.renderCanvas);
			         	this.map.flyTo({center: e.lngLat, zoom: 16, pitch: 100});

			         } else {
			         	this.setState({selected: null}, this.renderCanvas);
			         	this.map.flyTo({center: e.lngLat, zoom: 15, pitch: 40});
			         }
			      }.bind(this));
  				}.bind(this));

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
		   		this.initSitios(res.body);
		   		//this.setState({sitios: res.body}, this.addGeoJSON);
		   }.bind(this));
		mapboxgl.accessToken = 'pk.eyJ1Ijoib2oiLCJhIjoiSEw0cDJaNCJ9.9ffK1AU2O26zvS5Zsa6eqw';
		this.map = new mapboxgl.Map({
		  container: 'map-fullscreen', // container id
		  style: mapStyle, //stylesheet location
		 // style: lightMapStyle,
		  center: [this.state.coords.lng, this.state.coords.lat], // starting position
		  zoom: 5, // starting zoom
		  pitch: 45
		});
	
		//this.map.rotateTo(100);
		// Add zoom and rotation controls to the map.
		this.map.addControl(new mapboxgl.Navigation({position: 'top-left'}));
		this.map.on('style.load', function() {
			this.setState({mapLoaded: true}, this.addGeoJSON);
			//this.map.on('moveend', this.addGeoJSON);
			 setTimeout(function(){
				this.map.flyTo({
					zoom: 11,
					pitch: 45,
					speed: 1.2, 
					bearing: 100,
					curve: 1,
		 			easing: function(t) {
		    			return t;
		  			}
				});
				this.map.on('move', function(e) {
					this.updatePixelCoords();
					// console.log("moving");
					// console.log(this.map.getBounds());
				}.bind(this));
			}.bind(this), 400);
			/*if(this.props.localidadData!=null){
		 	this.loadMapData(this.props.localidadData);
		}*/
			//this.loadMapData(LOCALIDAD_DATA);
		}.bind(this));
		
		// this.map.flyTo
		this.canvas = this.refs.canvas.getDOMNode();
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		window.addEventListener( 'resize', this.onResize, false );
	},
	onResize: function(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.updatePixelCoords();
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.bounds != this.props.bounds){
			console.log("bounds changed");
			console.log(nextProps.bounds);
			this.map.fitBounds(nextProps.bounds, {bearing: 100});
		}
	},
	render() {
		//console.l	<label>{this.props.label}</label>og("rerendering maplocator");
		var info = {};
		if(this.state.selected != null) {
			info = (<InfoWindow info = {this.state.selected} />);
		}
	    return (
              <div id='map-container-fullscreen'>
              	<div id='map-fullscreen'/>
      			<canvas id="map-canvas" ref="canvas"/>
      			{info}
              </div>
	    );
  }
});

export default BaseMap;