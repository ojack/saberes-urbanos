import React from 'react';
import BaseMap from './BaseMap';
import Navigation from './Navigation';
import Ingresar from './Ingresar'
import request from 'superagent';
import AudioContextManager from './AudioContextManager'
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
     // '#FF85A3',
     '#FF5C85',
     '#FF3366',
     '#BF264D',
     '#801A33'
    ];

var Main = React.createClass({
getInitialState(){
	var sw = new mapboxgl.LngLat(-74.16126694164626, 4.5155410235603455);
	var ne = new mapboxgl.LngLat( -73.91643370363467, 4.838602784913988);
	var bounds = new mapboxgl.LngLatBounds(sw, ne);
		return ({bounds: bounds, mapLoaded: false, sitios: null, color: "#ff3366", categorias: null, outline: null});
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
  setOutline(outlineJson){
    console.log("boundary is ");
    console.log(outlineJson);
    this.setState({outline: outlineJson});
  },
  initSitios(sitios){
     var categorias = {};
    
    var sit = sitios.map(function(obj, index){
      obj.properties.tempId = index;
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
  },
  componentDidMount(){
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
    if(this.state.sitios!=null){
      mapElements.push( <BaseMap bounds={this.state.bounds} outline={this.state.outline} audioContext={this.audioContext} sitios={this.state.sitios} onMapLoaded={this.showElements}/>);
    }
  	if(this.state.mapLoaded){
  		mapElements.push(<Navigation setBounds={this.setBounds} setOutline={this.setOutline} categorias={this.state.categorias} color={this.state.color}/>);
  	}

  	  return(<div>
  	  		
  	  			{mapElements}
  	  			
  	  		</div>)
   	}
  
});

export default Main;