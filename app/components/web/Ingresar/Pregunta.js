import React from 'react';
import IngresarHex from './IngresarHex';

var Pregunta = React.createClass({
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
	

  var data = {
    attr: this.props.attr,
    value: this.state.value
  }
  var width = 245;
  var height = 283;
 var style = {
    color: this.props.primaryColor
 }
   var hexContents = (<div><p style={style} className="ingresar-primary-heading">Responde la pregunta:</p><p className="ingresar-secondary-heading">¿Que vale la pena conocer de tu barrio?</p></div>);

  	return (
  		<div className="row" >
  			<div className="six columns">
         
            <IngresarHex contents={hexContents} primaryColor={this.props.primaryColor} width={width} height={height}/>
        
            
          
        </div>
  			<div className="six columns">
  				<textarea onChange={this.setValue} value={this.state.value} className="u-full-width" placeholder="Respuesta..." maxLength="200" id="exampleMessage"></textarea>
  			</div>
        <button className="ingresar-continuar" onClick={this.props.nextStep.bind(null, data)}> Continuar </button>
        <h5 className="ingresar-cancelar" onClick={this.props.cancelar}> Cancelar </h5>
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