import React from 'react';

var BingGeocode = React.createClass({
  handleSearchChange(e){
		this.setState({searchString: e.target.value});
	
	},
	handleKeyUp(e){
		if(e.keyCode == 13){
			console.log("handling key up");
	      	//var query_string = "https://dev.virtualearth.net/REST/v1/Locations/1%20Microsoft%20Way%20Redmond%20WA%2098052?key=ArZ9iodclv6caCIXL7qFS8KBePoxP2a4etk2fVoy9Uw_BQEP3NEO7l_yNemfqQE2";
			this.geocode(e.target.value);
      	}
	},
	handleBlur(e){
		//alert();
		this.geocode(e.target.value);
	},
	geocode(value){
		var base_url = 'https://dev.virtualearth.net/REST/v1/Locations?';
			//var query = "1%20Microsoft%20Way%20Redmond%20WA%2098052";
			var query = encodeURIComponent(value)+ ", Bogotá, Colombia";
			var bing_key = "ArZ9iodclv6caCIXL7qFS8KBePoxP2a4etk2fVoy9Uw_BQEP3NEO7l_yNemfqQE2";

			var location = encodeURIComponent(this.props.location.lat+","+this.props.location.lng);

			var query_string = base_url+"query="+query+"&c=es-MX&includeNeighborhood=1&include=queryParse&userLocation="+location+"&key="+bing_key;
			console.log(query_string);
			 Meteor.call("makeGetRequest", query_string, function(error, results) {
			 	console.log(error);
			 	console.log(results);
			 	if(error == null){
			 		var res = results.data.resourceSets[0];
			 		if(res.estimatedTotal > 0){
			 			var points = res.resources[0].geocodePoints[0].coordinates;
			 			if(points!=null){
			 				this.props.updateLatLng(points[0], points[1]);
			 				//TODO ! make sure points inside bogota
			 			}
			 		}
			 	}
	        	//console.log(results.data.resourceSets[0].resources); 
	    	}.bind(this));
	},
	render() {
		// <GeoLocator/>
	    return (
	    			
	    			  <input type="text" className="u-full-width" onChange={this.handleSearchChange} onKeyUp={this.handleKeyUp} onBlur={this.handleBlur} placeholder="dirección..." />
               
	
	    		);
  }
});

export default BingGeocode;