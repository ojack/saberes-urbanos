import React from 'react';
import Formsy from 'formsy-react';
import Geocode from './Geocode';

var ReactScriptLoaderModule = require('react-script-loader');
var ReactScriptLoaderMixin= ReactScriptLoaderModule.ReactScriptLoaderMixin;
var ReactScriptLoader= ReactScriptLoaderModule.ReactScriptLoader;



var API_KEY = "AIzaSyDSAaqtPycMHBfGlBjG-q-UzKm6T-YDHhA";

//var scriptURL = "https://maps.googleapis.com/maps/api/js?key="+API_KEY+"&callback=initMap";

var scriptURL = "https://maps.googleapis.com/maps/api/js?key="+API_KEY;
// window.initMap = function() {
//       console.log("init map called");
//        // This triggers the onScriptLoaded method call on all mounted Map components.
//         ReactScriptLoader.triggerOnScriptLoaded(scriptURL);
//     };
var MapLocator = React.createClass({
	mixins: [Formsy.Mixin, ReactScriptLoaderMixin],
	// componentWillReceiveProps(nextProps){
	// 	if(nextProps.location != this.props.location){
	// 		this.map.flyTo({center: [nextProps.location.lat, nextProps.location.lng], zoom: 16});
	// 	}
		
	// },
	// changeValue: function(lat, lng){
	// 	this.setValue(event.currentTarget.value);
	// },
	 getScriptURL: function() {
        return scriptURL;
    },
    // Ensure that onScriptLoaded is deferred until the
    // ReactScriptLoader.triggerOnScriptLoaded() call above is made in
    // initializeMaps().
    deferOnScriptLoaded: function() {
       //return true;
      return true;
    },

    onScriptLoaded: function() {
        // Render a map with the center point given by the component's lat and lng
        // properties.
        console.log("script loaded");
        console.log(google.maps);
         console.log(this.state.componentLoaded);
        if(google.maps && this.state.componentLoaded){

        //[this.getValue().lng, this.getValue().lat]
        this.map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: this.getValue().lat, lng: this.getValue().lng},
		    zoom: 13,
		    streetViewControl: false,
  		});
  		google.maps.event.addListenerOnce(this.map, 'idle', function() {
  			 var bounds = this.map.getBounds();
        console.log("bounds are");
    		console.log(bounds);
         this.setState({scriptLoaded: true, bounds: bounds});
      }.bind(this));
       
  		 this.map.addListener('center_changed', function() {
    		var coords = this.map.getCenter();
    		console.log(coords);
    		this.setValue({lat: coords.lat(), lng: coords.lng()});
    		var bounds = this.map.getBounds();
    		this.setState({bounds: bounds});
  		}.bind(this));
  		this.geocoder = new google.maps.Geocoder();
  		} else {
        console.log("retrying");
        setTimeout(this.scriptLoaded, 100);
      }
     
    },
     onScriptError: function() {
        // Show the user an error message.
    },
    getInitialState(){
    	return {scriptLoaded: false, componentLoaded: false, bounds: null}
    },
	updateCoords(loc){
		//console.log("updating");
		//console.log(data);
		//data.coords.lat = loc.H;
				// data.coords.lng = results[0].geometry.location.L;
		this.setValue({lat: loc.lat(), lng: loc.lng()});
		this.map.setCenter(loc, 16);
		//this.map.flyTo({center: [data.coords.lng, data.coords.lat], zoom: 16});
	},
	componentDidMount(){
		//console.log("calling component mount");
		//console.log(this.props);
    this.setState({componentLoaded: true});
    setTimeout(function(){
      ReactScriptLoader.triggerOnScriptLoaded(scriptURL);
		
  }.bind(this), 600);
		
	},
	componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if (nextProps.bounds!=this.props.bounds){
      console.log(nextProps.bounds);
       var sw = new google.maps.LatLng(nextProps.bounds[1], nextProps.bounds[0]);
     var ne = new google.maps.LatLng(nextProps.bounds[3], nextProps.bounds[2]);
      var bounds = new google.maps.LatLngBounds(sw, ne);
    
      this.map.fitBounds(bounds)
    }
		//console.log("locator received props");
		//console.log(nextProps);
	},
	render() {
		//console.log("rerendering maplocator");
		var geocode = {};
		if(this.state.scriptLoaded){
			geocode = (	<Geocode coords={this.getValue()} geocoder={this.geocoder} bounds={this.state.bounds} querystring={this.props.direccion} updateCoords={this.updateCoords}/>);
		}
	    return (
	    	<div>
	    	<label>{this.props.label}</label>
              <div id='map-container'>
              	<div id='map'/>
              	<img id='pin' src="/img/pin-flat.png" alt="pin" height="40" width="25"/>
              	{geocode}
              </div>
             </div>
	    );
  }
});

export default MapLocator;