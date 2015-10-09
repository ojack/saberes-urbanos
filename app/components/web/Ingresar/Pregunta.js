import React from 'react';
import IngresarHex from './IngresarHex';

var Pregunta = React.createClass({
 getInitialState() {
    return {
      value : this.props.data.respuesta
    }
  },
  setValue(e){
    console.log("value is "+e.target.value);
    this.setState({value: e.target.value});
  },
  render() {
    console.log(this.props);
	

  var data = [{
    attr: this.props.attr,
    value: this.state.value
  }];
  var width = 245;
  var height = 283;
 var style = {
    color: this.props.primaryColor
 }

 var buttonStyle = {
    backgroundColor: this.props.primaryColor,
    color: "#fff"
 }
   var hexContents = (<div><p style={style} className="ingresar-primary-heading">Responde la pregunta:</p><p className="ingresar-secondary-heading">¿Que vale la pena conocer de tu barrio?</p></div>);

  	return (
  		<div className="row" >
  			<div className="six columns">
          <div className="ingresar-left-col">
            <IngresarHex contents={hexContents} primaryColor={this.props.primaryColor} width={width} height={height}/>
          </div>
            
          
        </div>
  			<div className="six columns">
  				<textarea className="ingresar-respuesta u-full-width" onChange={this.setValue} value={this.state.value} placeholder="Respuesta..." maxLength="200" id="exampleMessage"></textarea>
          <button className="ingresar-continuar" style={buttonStyle} onClick={this.props.nextStep.bind(null, data)}> Continuar </button>
          <h5 className="ingresar-cancelar" onClick={this.props.cancelar}> Cancelar </h5>
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