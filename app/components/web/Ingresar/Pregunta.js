import React from 'react';

var Pregunta = React.createClass({
 getInitialState() {
    return {
      value : this.props.value
    }
  },

  render() {
	var shadeStyle = {
		position: "fixed",
		left: "0px",
		top: "0px",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.4)"
	};
  	return (
  		<div className="row">
  			<div className="six columns">
  				<h3>Responde la pregunta:</h3>
  				<h4>Que vale la pena conocer de tu barrio?</h4>
  			</div>
  			<div className="six columns">
  				<textarea className="u-full-width" placeholder="Respuesta..." maxLength="200" id="exampleMessage"></textarea>
  			</div>
  		</div>
  	);
  	// switch(this.state.step){
  	// 	case 0: 
   //     	 return <Intro nextStep={this.nextStep}/>
   //     	case 1: 
   //     		 return <Main nextStep={this.nextStep} />
   // 	}
  }
});

export default Pregunta;