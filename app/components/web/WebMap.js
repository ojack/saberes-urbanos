import React from 'react';
import BaseMap from './BaseMap';
import Navigation from './Navigation';
import Ingresar from './Ingresar'
import request from 'superagent';
import AudioContextManager from './AudioContextManager';
import SitioData from './../util/SitioData';


var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

var WebMap = React.createClass({
  mixins: [ReactScriptLoaderMixin],
getInitialState(){
	
		return ({bounds: null, mapLoaded: false, scriptLoaded: false, words: [], sitios: null, color: "#ff3366", categorias: null, outline: null});
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
onMapMove(){
   this.setState({categorias: this.sitioData.categorias});
},
	setBounds(bbox){
		var ne = new mapboxgl.LngLat(bbox[0], bbox[1]);
		var sw = new mapboxgl.LngLat(bbox[2], bbox[3]);
		var bounds = new mapboxgl.LngLatBounds(sw, ne);
   // this.sitioDB.setBounds(bbox);
		this.setState({bounds: bounds});
	},
  setOutline(outlineJson){
    //console.log("boundary is ");
    //console.log(outlineJson);
    this.setState({outline: outlineJson});
  },
  searchSitios(query){
    console.log(query);
    this.sitioData.searchString(query);
   //
  },
  toggleMute(){
    console.log("called mute");
    this.audioContext.mute();
  },
  updateWordCloud(){
   // var words = this.sitioData.getWords();
   // console.log(words);
   // this.setState({words: words});
  },
  getCategoria(query){
    //
  },
  // initSitios(sitios){
  
  //   this.setState({sitios: sit, categorias: categorias});
  // //  this.sitioDB.addSitios(sit);
  // },
  componentDidMount(){
    //this.sitioDB = new SitioDB();
    this.audioContext = new AudioContextManager();
    this.sitioData = new SitioData(this.audioContext, function(err, data){
      if(err){
        console.log(err);
      } else {
        this.setState({sitios: data.sitios, categorias: data.categorias});
      }

    }.bind(this));
   
  },
  componentWillUnmount: function () {
      cancelAnimationFrame(this.renderCanvas);
  },
  render() {
  	var mapElements = [];
    var muteStyle = {
      position: "absolute",
      right: "10px",
      top: "10px",
     
      backgroundColor: "#000"
    }
    if(this.state.scriptLoaded==true && this.state.sitios!=null){
      mapElements.push( <BaseMap bounds={this.state.bounds} onMapMove={this.onMapMove} onMoveEnd={this.updateWordCloud} outline={this.state.outline} audioContext={this.audioContext} mapLoaded={this.state.mapLoaded} sitioData={this.sitioData} onMapLoaded={this.showElements}/>);
    }
  	if(this.state.mapLoaded){
  		mapElements.push(<Navigation setBounds={this.setBounds} setOutline={this.setOutline} categorias={this.state.categorias} searchSitios={this.searchSitios} getCategoria={this.getCategoria} color={this.state.color}/>);
  	 mapElements.push(<div style={muteStyle} onClick={this.toggleMute}>MUTE</div>);
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

export default WebMap;