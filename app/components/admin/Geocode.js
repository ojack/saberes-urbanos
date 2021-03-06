import React from 'react';
import request from 'superagent';

var Geocode = React.createClass({
	getInitialState(){
		console.log(this.props.geocoder);
		//when user hasnt touched search box, value is set from props
		return {updateFromProps: true, querystring: this.props.querystring}
	},
  handleSearchChange(e){
		this.setState({querystring: e.target.value, updateFromProps: false});
	
	},

	handleKeyUp(e){
		e.preventDefault();
		if(e.keyCode == 13){
			//console.log("handling key up");
	      	//var query_string = "https://dev.virtualearth.net/REST/v1/Locations/1%20Microsoft%20Way%20Redmond%20WA%2098052?key=ArZ9iodclv6caCIXL7qFS8KBePoxP2a4etk2fVoy9Uw_BQEP3NEO7l_yNemfqQE2";
			this.geocode();
      	}
	},
	handleBlur(e){
		//alert();
		this.geocode();
	},
	geocode(){
		//console.log("query string is " + this.state.querystring);
		if(this.state.querystring != null){
			console.log(this.props.bounds);
			this.props.geocoder.geocode({'address': this.state.querystring, 'componentRestrictions': {country: 'CO', locality: 'Bogotá'}, bounds: this.props.bounds, 'region': 'CO'}, function(results, status) {
			    if (status === google.maps.GeocoderStatus.OK) {
			      // resultsMap.setCenter(results[0].geometry.location);
			      // var marker = new google.maps.Marker({
			      //   map: resultsMap,
			      //   position: results[0].geometry.location
			      // });
				// var data = {};
				// data.coords = {};
				// data.coords.lat = results[0].geometry.location.H;
				// data.coords.lng = results[0].geometry.location.L;
				this.props.updateCoords(results[0].geometry.location);
					console.log(results);
			    } else {
			      console.log('Geocode was not successful for the following reason: ' + status);
			    }
  			}.bind(this));
		// 	var query = { query: this.state.querystring, lat: this.props.coords.lat, lng: this.props.coords.lng };
		// 	//console.log(query);
		// 	 request
		// 	   .get('/api/geocode')
		// 	   .query(query)
		// 	   .end(function(err, res){
		// 	   		if(err){
		// 	   			//console.log(err);
		// 	   		} else {
		// 	   			//console.log(res);
		// 	   			this.props.updateCoords(res.body);
		// 	   		}
		// 	   }.bind(this));
		}
	},
	componentWillReceiveProps(nextProps){
		//console.log("received props");
		//console.log(nextProps);
		if(this.state.updateFromProps){
			if(nextProps.querystring != this.state.querystring){
				this.setState({querystring: nextProps.querystring}, function(){
					this.geocode();
				}.bind(this));
			}
		}
	},
	componentWillMount(){
		if(this.props.querystring!=null){
			this.geocode(this.state.querystring);
		}
	},
	render() {
		//this.geocode(this.props.querystring);
	    return (
	    			
	    			  <input type="text" id="geocode" onChange={this.handleSearchChange} value={this.state.querystring} onKeyUp={this.handleKeyUp} onBlur={this.handleBlur} placeholder="Buscar..." />
               
	
	    		);
  }
});

export default Geocode;