import React from 'react';
import Pregunta from './Ingresar/Pregunta'
import Porque from './Ingresar/Porque'
import Ubicacion from './Ingresar/Ubicacion'

var data = {
  respuesta: "",
  porque: null,
  existente: null,
  localidad: "PUENTE ARANDA",
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
     for(var i = 0; i < val.length; i++){
       data[val[i].attr]=val[i].value;
      }
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
		//position: "fixed",
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
    cancelar: this.cancelar,
    data: this.state.data
  }

 

  var formContents = {};
  console.log("step is "+ this.state.step);
  switch(this.state.step){
    case 0: 
          formContents = <Pregunta {...props} />;
          break;
    case 1: 
          formContents = <Porque {...props}/>;
          break;
    case 2: 
          formContents = <Ubicacion {...props}/>;
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