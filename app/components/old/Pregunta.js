import React from 'react';

var preguntas = [
"¿Qué conservaría usted de su barrio?",
"¿Qué mostraría usted de su barrio?",
"¿Qué vale la pena conocer de su barrio?",
"¿Para usted, qué es imprescindible de su barrio?"
];


var Pregunta = React.createClass({
  render() {
    var rand = Math.floor(Math.random()*preguntas.length);
    return (
      <div>
        <h1>{preguntas[rand]}</h1>
        <label>Respuesta</label>
        <input className="u-full-width" type="text" ref="respuesta" defaultValue={this.props.fieldValues.respuesta} />
 		 <label for="Porque">¿Por qué?</label>
		  <textarea className="u-full-width" placeholder="Por que..." id="Descripcion"></textarea>
		  <label>Temporalidad</label>
		  <label className="temporalidad">
		    <input type="checkbox"/>
		    <span className="label-body">Existe</span>
		    <input type="checkbox"/>
		    <span className="label-body">Ya no existe</span>
		  </label>
        <button className="button-primary" onClick={this.saveAndContinue}>Guardar y Continuar</button>
      </div>
    )
  },
 
  saveAndContinue(e) {
    e.preventDefault()
 
    // Get values via this.refs
    var data = {
      respuesta     : this.refs.respuesta.getDOMNode().value,
    }
 
    this.props.saveValues(data)
    this.props.nextStep()
  }
})

export default Pregunta;