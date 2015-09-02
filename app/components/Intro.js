import React from 'react';


var Intro = React.createClass({

  render() {
  	  return( 
  	  	<div onMouseDown={this.props.nextStep}>
	  	  	<div className="header">
	  	  		<img src="./img/logo-complete-01.png"/>
	  	  	</div>
	  	  	<div className="container">
		  	  	<div className="row intro-container">
		  	  		<h4 className="intro-text">El Observatorio de Saberes Bogotanos <br></br> toma vida gracias a usted, a su amor y a sus experiencias vividas como habitante de la ciudad.</h4>
		  	  		<button className="button-large">Entrar</button>
		  	  	</div>
	  	  	</div>
		</div>);
   	}
  
});

export default Intro;