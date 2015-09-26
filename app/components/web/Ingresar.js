import React from 'react';
import Pregunta from './Ingresar/Pregunta'

var Ingresar = React.createClass({
 	getInitialState() {
    return {
      step : 0
    }
  },
  nextStep() {
    console.log("going to next step");
    this.setState({
      step : this.state.step + 1
    })
  },

  previousStep() {
    this.setState({
      step : this.state.step - 1
    })
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
  var containerStyle={
    position: "fixed",
      left: "0px",
    top: "0px"
  }
  var formContents = {};
  switch(this.state.step){
     case 0: 
          formContents = <Pregunta nextStep={this.nextStep}/>;
    case 1: 
          formContents = <Pregunta nextStep={this.nextStep}/>;
     }
  	return (<div>
              <div style={shadeStyle}></div>
              <div className="container" style={containerStyle}>{formContents}</div>
            </div>);
  	
  }
});

export default Ingresar;