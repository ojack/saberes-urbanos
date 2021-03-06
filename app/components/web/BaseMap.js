import React from 'react';
//import mapboxgl from 'mapbox-gl';
import request from 'superagent';
import mapStyle from './../data/light-v8-edit.json'
import HexGrid from './HexGrid'
import InfoDetail from './InfoDetail'
import AudioContextManager from './AudioContextManager'
import WordCloud from './WordCloud'
import CanvasHex from './../util/CanvasHex'

var readyToRender = false;
function drawHex(ctx, coords, rad){
	
		var angle;
		 for (var i = 0; i <= 6; i++) {
        angle = i * 2 * Math.PI / 6;
       
        ctx.lineTo(coords.x + rad * Math.cos(angle), coords.y + rad * Math.sin(angle));
    	}
    	
		//ctx.fillRect(Math.floor(coords.x)-rad/2, Math.floor(coords.y)-rad/2,rad, rad);

}

function drawHalo(ctx, inner, mag, levels, coords){
		for(var i = 0; i < levels; i++){
			ctx.beginPath();
			drawHex(ctx, coords,inner+mag*(i+1));
			ctx.closePath();
			ctx.stroke();
		}
}

var BaseMap = React.createClass({
	
	getInitialState(){
		return({coords: {
	         lat: 4.597,
	         lng: -74.09
	     }, 
	     selected: null,
	     mapLoaded: false,
	     dataLoadedToMap: false,
	     words: [],
	 	zoom: 12});
	},
	

	updatePixelCoords(){
		this.props.sitioData.updateBounds(this.map.getBounds());
		var zoom = this.map.getZoom();
	if(this.props.sitioData.currentSitios != null && this.state.mapLoaded){
		var sit = this.props.sitioData.currentSitios.map(function(obj, index){
			
			obj.properties.screenCoords = this.map.project({lat: obj.geometry.coordinates[1], lng: obj.geometry.coordinates[0]});
			if(obj.properties.hasSound){
				//this.props.audioContext.positionPanner(index, obj.properties.screenCoords.x, obj.properties.screenCoords.y, 18-zoom);
			}
			return obj;
		}.bind(this));
		this.props.onMapMove();
			//this.setState({sitios: sit}, this.renderCanvas);
			//console.log(sit);
			//this.renderCanvas();
		if(!readyToRender){
			this.setState({sitios: sit}, this.renderCanvas);
			readyToRender = true;
		} else {
			this.setState({sitios: sit});
		}
	}
	},
	renderCanvas(){
		this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
		
		var rad = 8;
		var outerRad;
		for(var i = 0; i < this.props.sitioData.currentSitios.length; i++){
			var obj = this.props.sitioData.currentSitios[i];
			

			var vol = 0;
			var mult = 1;
			
			// if(this.state.selected != null && obj.properties.tempId == this.state.selected.tempId){
			// 	// = 20;
			// }
			//this.ctx.fillStyle = "#FF3366";
			//this.ctx.fillStyle = "#000";
			if(obj.properties.highlighted){
				mult=3;
				var hex;
				if(obj.properties.canvasHex){
					hex = obj.properties.canvasHex;
				} else {
					//console.log(obj.properties.fotoSmall);
					var url = obj.properties.fotoSmall;
					// var url = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSrrglfsI5q0J9bx2gAOEa5dI2dQDSEGhuKaV-u5UxLnhrmuvE";
		 			hex = new CanvasHex(rad*mult, url, obj.properties.color);
		 			obj.properties.canvasHex = hex;
				}
				this.ctx.drawImage(hex.canvas, obj.properties.screenCoords.x-rad*mult, obj.properties.screenCoords.y-rad*mult);
				var opacity = 0.4;
				console.log(obj.properties.color);
				this.ctx.strokeStyle = "rgba(255, 51, 102, "+ opacity+")";
				this.ctx.strokeStyle = obj.properties.color;
				drawHalo(this.ctx, rad*mult, 20, 6, obj.properties.screenCoords);
			} else {
				this.ctx.fillStyle = obj.properties.color;
			this.ctx.beginPath();
			
			drawHex(this.ctx, obj.properties.screenCoords, rad*mult);
			this.ctx.closePath();
			this.ctx.fill();
			}

			outerRad = rad*mult + 3*mult;
			
			if(obj.properties.hasSound){
				
				//console.log(this.props.audioContext);
				//
				vol = this.props.audioContext.getVolume(obj.properties.tempId);
				//console.log(vol);
				outerRad = outerRad + vol;

				var opacity = 0.7*(1-vol/100);
				drawHalo(this.ctx, rad, vol*0.8, 3, obj.properties.screenCoords);
			// this.ctx.strokeStyle = "rgba(255, 51, 102, "+ opacity+")";
			// //this.ctx.strokeStyle = "#FF3366";
			// this.ctx.beginPath();
			// drawHex(this.ctx, obj.properties.screenCoords, outerRad);
			// this.ctx.closePath();
			// this.ctx.stroke();

			// this.ctx.beginPath();
			// drawHex(this.ctx, obj.properties.screenCoords, outerRad-vol/3);
			// this.ctx.closePath();
			// this.ctx.stroke();
			// this.ctx.beginPath();
			// drawHex(this.ctx, obj.properties.screenCoords, outerRad-vol*2/3);
			// this.ctx.closePath();
			// this.ctx.stroke();
			} else {
				var opacity = 0.5*(1-vol/100);
			this.ctx.strokeStyle = "rgba(255, 51, 102, "+ opacity+")";
			//this.ctx.strokeStyle = "#FF3366";
			this.ctx.beginPath();
			drawHex(this.ctx, obj.properties.screenCoords, outerRad);
			this.ctx.closePath();
			this.ctx.stroke();
			}
			
			//this.ctx.fillRect(i*10, i*10,8, 8);
			//this.ctx.fillRect(100,100, 8, 8);
		}
		requestAnimationFrame(this.renderCanvas);
	},
	addOutline(outline){
		console.log("adding outline");
		
		if(this.outlineSource==null){
			this.outlineSource = new mapboxgl.GeoJSONSource({data: outline});
			this.map.addSource('outline', this.outlineSource); // add
				this.map.addLayer({
				    "id": "outline",
				    "type": "line",
				    "source": "outline",
				    "paint": {
				    
				      "line-color": "rgba(120, 120, 120, 1.0)",
				      "line-width": 5,
				  
				    // "fill-outline-color": "#333"
				    },
				   // "interactive": true
				    
				  //paint.* : class-specific paint properties
				});
		} else {
			this.outlineSource.setData(outline);
		}
	},
	addGeoJSON(){
		//only load data if map has been initialized, data has been received, and data has no already been loaded
		if(this.props.sitioData.data != null && this.state.mapLoaded && !this.state.dataLoadedToMap){
			
			console.log("adding data");
			// console.log(this.state.sitios);
			 this.map.addSource("markers", {
			    "type": "geojson",
			   // "data": this.state.sitios,
			    "data": {
			      "type": "FeatureCollection",
			      "features": this.props.sitioData.data
			    }
			  });
			 //{respuesta}
			  // "text-max-width": 40,
			      // "text-transform": "uppercase",
			 this.map.addLayer({
			    "id": "markers",
			    "type": "symbol",
			    "source": "markers",
			    "interactive": true,
			    "layout": {
			     "icon-image": "default_marker"//,
			    //  "text-field": "{respuesta}",
			    //   "text-font": ["Open Sans Semibold, Arial Unicode MS Bold"],

			    // "text-offset": [0.0, 1.0],
			    //   "text-anchor": "top",
			    //   "text-justify": "center",
			    //   "text-optional": true,
			    //   "text-size": 12,
			    },
			    "paint": {
			    	"icon-opacity": 0.05,
			        "text-color":"#111"
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
			         	console.log(e.lngLat);
			         	console.log(features[0].properties);
			         	this.setState({selected: features[0].properties, coords: {lat: e.lngLat.lat, lng: e.lngLat.lng}});
			         	this.map.flyTo({center: e.lngLat, zoom: 16, pitch: 100});

			         } else {
			         	this.setState({selected: null});
			         	//this.setState({selected: null, coords: {lat: e.lngLat.lat, lng: e.lngLat.lng}}, this.renderCanvas);
			         	//this.map.flyTo({center: e.lngLat, zoom: 15, pitch: 40});
			         }
			      }.bind(this));
  				}.bind(this));
			 this.map.on('move', function(e) {
					this.updatePixelCoords();
					// console.log("moving");
					// console.log(this.map.getBounds());
				}.bind(this));

			 this.map.on('moveend', function(e) {
					//this.props.onMoveEnd();
					  var words = this.props.sitioData.getWords();
   // console.log(words);
    this.setState({words: words});

				}.bind(this));
		
		

		}
		
	},
	componentDidMount(){
		console.log("calling component mount");
		console.log(this.props);
		
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
		
		this.map.on('style.load', function() {
			
			//this.map.on('moveend', this.addGeoJSON);
			 setTimeout(function(){
				this.map.flyTo({
					zoom: this.state.zoom,
					pitch: 45,
					speed: 1.2, 
					bearing: 100,
					curve: 1,
		 			easing: function(t) {
		    			return t;
		  			}
				});
				
			}.bind(this), 400);
			setTimeout(function(){
				this.setState({mapLoaded: true}, this.addGeoJSON);
				this.props.onMapLoaded();
				this.map.addControl(new mapboxgl.Navigation({position: 'top-left'}));
			}.bind(this), 3000)
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
		requestAnimationFrame(this.renderCanvas);
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
			this.setState({selected: null});
			
		}
		if(nextProps.outline != this.props.outline){
				this.addOutline(nextProps.outline);
		}
	},
	render() {
		//console.l	<label>{this.props.label}</label>og("rerendering maplocator");
		var info = [];
		

		if(this.state.selected != null) {
			 info.push(<HexGrid />);
			info.push(<InfoDetail info = {this.state.selected} coords = {this.state.coords} />);
			//info.push(<SvgHex coords={this.state.coords}/>);
		}
		//<WordCloud words={this.state.words}/>
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