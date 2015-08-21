import React from 'react';
import Words from './Words';
import Pregunta from './Pregunta';

//TODO: send this from server
var fieldValues = {
  respuesta    : null,
  ubicacion : {localidad: null, barrio: null, direccion: null},
  temporalidad     : null,
  porque   : null,
  categoria: null,
  existente: true
}

var PatrimonioForm = React.createClass({
  getInitialState() {
    return {
      step : 0
    }
  },
  nextStep() {
    this.setState({
      step : this.state.step + 1
    })
  },

  previousStep() {
    this.setState({
      step : this.state.step - 1
    })
  },

  saveValues(field_value) {
    return function() {
      fieldValues = Object.assign({}, fieldValues, field_value)
    }.bind(this)()
  },
  render() {
  	switch(this.state.step){
  		case 0: 
       	 return <Words nextStep={this.nextStep}/>
       	case 1: 
       		 return <Pregunta fieldValues={fieldValues}
                         saveValues={this.saveValues}
                         nextStep={this.nextStep} />
   	}
  }
});

export default PatrimonioForm;