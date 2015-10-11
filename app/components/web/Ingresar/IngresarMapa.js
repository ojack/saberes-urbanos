import React from 'react';
import Geocode from './../../admin/Geocode';

var IngresarMapa = React.createClass({
  

    onScriptLoaded: function() {
        // Render a map with the center point given by the component's lat and lng
        // properties.
        console.log("script loaded");
        console.log(google.maps);
         console.log(this.state.componentLoaded);
       // if(google.maps && this.state.componentLoaded){

        //[this.getValue().lng, this.getValue().lat]
        this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.state.coords.lat, lng: this.state.coords.lng},
        zoom: 13,
        streetViewControl: false,
        mapTypeControl:false,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
    }
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
       
        var bounds = this.map.getBounds();
        this.setState({bounds: bounds, coords:{lat: coords.lat(), lng: coords.lng()}});
        this.props.updateCoords({lat: coords.lat(), lng: coords.lng()});
      }.bind(this));
      this.geocoder = new google.maps.Geocoder();
      // } else {
    //     console.log("retrying");
    //     setTimeout(this.scriptLoaded, 100);
    //   }
     
    },
     onScriptError: function() {
        // Show the user an error message.
    },
    getInitialState(){
      return {scriptLoaded: false, componentLoaded: false, bounds: null, coords: this.props.coords}
    },
  updateCoords(loc){
   
    this.setState({coords: {lat: loc.lat(), lng: loc.lng()}});
    this.map.setCenter(loc, 16);
    //this.map.flyTo({center: [data.coords.lng, data.coords.lat], zoom: 16});
  },
  componentDidMount(){
    //console.log("calling component mount");
    //console.log(this.props);
    this.setState({componentLoaded: true});
    this.onScriptLoaded();
  //   setTimeout(function(){
  //     ReactScriptLoader.triggerOnScriptLoaded(scriptURL);
    
  // }.bind(this), 600);
    
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
    var mapContainerStyle = {width: this.props.width, height: this.props.height};
    var mapStyle = {width: this.props.width, height: this.props.height};
    //console.log("rerendering maplocator");
    var geocode = {};
    if(this.state.scriptLoaded){
      geocode = ( <Geocode coords={this.state.coords} geocoder={this.geocoder} bounds={this.state.bounds} querystring={this.props.direccion} updateCoords={this.updateCoords}/>);
    }
      return (
        <div>
              <div style={mapContainerStyle}>
                <div style={mapStyle} id='map'/>
                <img id='pin' src="/img/pin-flat.png" alt="pin" height="40" width="25"/>
                {geocode}
              </div>
             </div>
      );
  }
});

export default IngresarMapa;