import React from 'react';
import BaseMap from './BaseMap';
import Navigation from './Navigation';
import Ingresar from './Ingresar'
import request from 'superagent';
import AudioContextManager from './AudioContextManager';
import SitioDB from './../util/SitioDB';
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
// ne:
// lat: 4.838602784913988
// lng: -73.91643370363467

// sw: 
// lat: 4.5155410235603455
// lng: -74.16126694164626
var colorArray = [
     // '#C1AFD1',
     // '#D6C9E0',
     // '#EAE4F0',
     // '#FFD6E0',
     // '#FFADC2',
     '#FF85A3',
     '#FF5C85',
     '#FF3366',
     '#BF264D',
     '#801A33'
    ];

var Main = React.createClass({
  mixins: [ReactScriptLoaderMixin],
getInitialState(){
	
		return ({bounds: null, mapLoaded: false, scriptLoaded: false, sitios: null, color: "#ff3366", categorias: null, outline: null});
},
getScriptURL: function() {
        return 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.10.0/mapbox-gl.js';
    },
    // ReactScriptLoaderMixin calls this function when the script has loaded
    // successfully.
    onScriptLoaded: function() {
        var sw = new mapboxgl.LngLat(-74.16126694164626, 4.5155410235603455);
  var ne = new mapboxgl.LngLat( -73.91643370363467, 4.838602784913988);
  var bounds = new mapboxgl.LngLatBounds(sw, ne);
      this.setState({bounds: bounds, scriptLoaded: true});
    },

    // ReactScriptLoaderMixin calls this function when the script has failed to load.
    onScriptError: function() {
        console.log("error loading mapboxgl");
    },
showElements(){
	this.setState({mapLoaded: true});
},
	setBounds(bbox){
		var ne = new mapboxgl.LngLat(bbox[0], bbox[1]);
		var sw = new mapboxgl.LngLat(bbox[2], bbox[3]);
		var bounds = new mapboxgl.LngLatBounds(sw, ne);
    this.sitioDB.setBounds(bbox);
		this.setState({bounds: bounds});
   
	},
  setOutline(outlineJson){
    console.log("boundary is ");
    console.log(outlineJson);
    this.setState({outline: outlineJson});
  },
  searchSitios(query){
     this.sitioDB.searchSitios(query, function(err, results){
        if(err){
          console.log(err);
        } else {
          console.log(results);
        }
     });
  },
  getCategoria(query){
    this.sitioDB.getCategoria(query, function(err, results){
        if(err){
          console.log(err);
        } else {
          console.log(results);
        }
     });
  },
  initSitios(sitios){
    var categorias = {};
  // //  this.sitioDB.addSitios(sitios);
    var sit = sitios.map(function(obj, index){
      obj.properties.tempId = index;
      delete obj.__v;
      if(obj.properties.sonidoUrl){
        console.log(" has sound "+ obj.properties.sonidoUrl);
        this.audioContext.addSound(index, obj.properties.sonidoUrl);
        obj.properties.hasSound = true;
      } else {
        obj.properties.hasSound = false;
      }
      var cat = obj.properties.categoria;
       if(cat){
         if(categorias.hasOwnProperty(cat)){
           categorias[cat].count +=1;
         } else {
           categorias[cat] = {count: 0, color: colorArray[Math.floor(Math.random()*colorArray.length)]};
          
         }
         obj.properties.color = categorias[cat].color;
       } else {
          obj.properties.color = "#ff3366";
       }
      
      return obj;
    }.bind(this));
    this.setState({sitios: sit, categorias: categorias});
    this.sitioDB.addSitios(sit);
  },
  componentDidMount(){
    this.sitioDB = new SitioDB();
    this.audioContext = new AudioContextManager();
    request
       .get('/api/sitios')
       .query({ limit: 50 })
       .end(function(err, res){
          console.log(res.body);
          this.initSitios(res.body);
          //this.setState({sitios: res.body}, this.addGeoJSON);
       }.bind(this));
  },
  render() {
  	var mapElements = [];
    if(this.state.scriptLoaded==true && this.state.sitios!=null){
      mapElements.push( <BaseMap bounds={this.state.bounds} outline={this.state.outline} audioContext={this.audioContext} sitios={this.state.sitios} mapLoaded={this.state.mapLoaded} onMapLoaded={this.showElements}/>);
    }
  	if(this.state.mapLoaded){
  		mapElements.push(<Navigation setBounds={this.setBounds} setOutline={this.setOutline} categorias={this.state.categorias} searchSitios={this.searchSitios} getCategoria={this.getCategoria} color={this.state.color}/>);
  	}
      var containerStyle = {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0px",
        left: "0px"
      }
  	  return(<div>
  	  		
  	  			{mapElements}
  	  		</div>)
   	}
  
});

export default Main;