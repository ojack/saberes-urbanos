import React from 'react';
import IngresarHex from './IngresarHex';

var PorqueInput = React.createClass({
 getInitialState() {
    return {
      value : this.props.value
    }
  },
  setValue(e){
    console.log("value is "+e.target.value);
    this.setState({value: e.target.value});
  },
  render() {
    console.log(this.props);
	

  
  var width = 245;
  var height = 283;
 var style = {
    color: this.props.primaryColor
 }

 var buttonStyle = {
    backgroundColor: this.props.primaryColor,
    color: "#fff"
 }
   var hexContents = (<div><p style={style} className="ingresar-primary-heading">¿Por que?</p></div>);

  	return (
  		<div className="row" >
  			<div className="six columns">
          <div className="ingresar-left-col">
            <IngresarHex contents={hexContents} primaryColor={this.props.primaryColor} width={width} height={height}/>
          </div>
            
          
        </div>
  			<div className="six columns">
  				<textarea className="ingresar-respuesta u-full-width" onChange={this.setValue} value={this.state.value} placeholder="Respuesta..." maxLength="200" id="exampleMessage"></textarea>
          <button className="ingresar-continuar" style={buttonStyle} onClick={this.props.nextStep.bind(null, this.state.value)}> Confirmar </button>
          <h5 className="ingresar-cancelar" onClick={this.props.nextStep.bind(null, null)}> Cancelar </h5>
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

export default PorqueInput;