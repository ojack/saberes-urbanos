import React from 'react';
import Pregunta from './Ingresar/Pregunta'
import Porque from './Ingresar/Porque'

var data = {
  respuesta: null,
  porque: null,
  existente: null,
  localidad: null,
  barrio: null, 
  direccion: null, 
  coords: {
         lat: 4.597,
         lng: -74.09
     }, 
  foto: null,
  sonido: null, 
  videoUrl: null,
  userId: null,
  visible: null
};

var Ingresar = React.createClass({
 	getInitialState() {
    return {
      step : 0,
      data: data
    }
  },
  nextStep(val) {
    console.log("going to next step");
     console.log(val);
     var data = this.state.data;
     data[val.attr]=val.value;
    this.setState({
      step : this.state.step + 1,
      data: data
    })
  },
  cancelar(){
     console.log("cancelar called");
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
		backgroundColor: "rgba(0, 0, 0, 0.6)"
	};
  var containerStyle={
    position: "fixed",
      left: "0px",
    top: "0px"
  }
  var props = {
    primaryColor: "#ff3366",
    nextStep: this.nextStep,
    cancelar: this.cancelar
  }
  var formContents = {};
  console.log("step is "+ this.state.step);
  switch(this.state.step){
    case 0: 
          formContents = <Pregunta {...props} attr={"respuesta"} value={this.state.data.respuesta}/>;
          break;
    case 1: 
          formContents = <Porque {...props} attr={"porque"} value={this.state.data.porque}/>;
          break;
     }
  	return (<div style={shadeStyle}>
              <div className="container">
                <div>{formContents}</div>
              </div>
            </div>);
  	
  }
});

export default Ingresar;