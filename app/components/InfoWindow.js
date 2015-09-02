import React from 'react';


var InfoWindow = React.createClass({

  render() {
  	var container_style = {
  		position: "fixed",
  		top: 90,
  		right: 450,
  		color: "#333",
  		width: 200,
  		pointerEvents: 'none',
  		textTransform: 'uppercase'
  	};
  	var element_style = {
  		margin: "0px",
  		fontSize: "15px"
  	};
  	var header_style= {
  		margin: "0px",
  		fontSize: "32px"
  	};
  	var respuesta_style= {
  		margin: "0px",
  		fontSize: "15px",
  		color: "ff3366"
  	};
  	var element = [
  	];
  	console.log(this.props.info);
  	  return(<div style={container_style}>
  	  			<h3 style={header_style}> EDIFICIO </h3>
  	  			<h5 style={respuesta_style}> {this.props.info.respuesta} </h5>
  	  			<h5 style={element_style}> LOCALIDAD / {this.props.info.localidad} </h5>
  	  			<h5 style={element_style}> BARRIO / {this.props.info.barrio} </h5>
  	  			<h5 style={element_style}> DIRECCIÓN / {this.props.info.direccion} </h5>
  	  			<h5 style={element_style}> TEMPORALIDAD / {this.props.info.temporalidad} </h5>
  	  		</div>)
   	}
  
});

export default InfoWindow;