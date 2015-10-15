import React from 'react';
import IngresarHex from './IngresarHex';

var Pregunta = React.createClass({
 getInitialState() {
    return {
      value : this.props.data.respuesta
    }
  },
  setValue(e){
    //console.log("value is "+e.target.value);
    //this.setState({value: e.target.value});
     var data = [{
      attr: "respuesta",
      value: e.target.value
  }];
    this.props.updateData(data);
  },
  render() {
    console.log(this.props);
	

 
  
 var style = {
    color: this.props.primaryColor
 }

 var buttonStyle = {
    backgroundColor: this.props.primaryColor,
    color: "#fff"
 }

 var textContainerStyle = {
    position: "absolute",
    top: this.props.hexPositions[1].top,
    left: this.props.hexPositions[1].left,
    width: this.props.hexWidth,
    height: this.props.hexHeight,
 }

  var textAreaStyle = {
    position: "absolute",
    width: "80%",
    top: "50%",
    height: this.props.hexHeight/2,
    margin: "5%",
    marginTop: -this.props.hexHeight/4
 }
   var hexContents = (<div><p style={style} className="ingresar-primary-heading">Responde la pregunta:</p><p className="ingresar-secondary-heading">¿Que vale la pena conocer de tu barrio?</p></div>);

  	return (
    		<div id="pregunta" className={"ingresar-component "+this.props.selectedState}>
          <div>
            <IngresarHex contents={hexContents} position={this.props.hexPositions[0]} primaryColor={this.props.primaryColor} width={this.props.hexWidth} height={this.props.hexHeight}/>
          </div>
            
  			<div style={textContainerStyle}>
  				<textarea style={textAreaStyle} onChange={this.setValue} value={this.props.data.respuesta} placeholder="Respuesta..." maxLength="200" id="exampleMessage"></textarea>
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