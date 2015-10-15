import React from 'react';
import IngresarHex from './IngresarHex';
import PorqueInput from './PorqueInput';

//  top: -70px;
// left: 122px;


var buttonArray = [
  {text: "sube una foto", img: "./../img/ingresar-foto.png"},
  {text: "sube un audio", img: "./../img/ingresar-audio.png"},
  {text: "escribe algo", img: "./../img/ingresar-escribir.png"}
];

var Porque = React.createClass({
 getInitialState() {
  var bArray = buttonArray;
   bArray[0].positionIndex = 3;
    bArray[1].positionIndex = 4;
    bArray[2].positionIndex = 5;
    console.log(bArray);
    return {
      value : this.props.value,
      buttonArray: bArray,
      foto: null,
      sonido: null,
      porque: null,
      showPorqueInput: false
    }
  },
  handleClick(index){
    console.log(index);
    if(index==2){
      this.setState({showPorqueInput: true});
    }
  },
  handleBlur(){
    var data = [
    { attr: "sonido", value: this.state.sonido},
    { attr: "foto", value: this.state.foto},
    { attr: "porque", value: this.state.porque}
  ];
    console.log("blur");
    this.props.updateData(data);
  },
  closePorque(val){
    console.log(val);
    this.setState({showPorqueInput: false, porque: val});
  },
  setValue(e){
    console.log("value is "+e.target.value);
    this.setState({value: e.target.value});
  },
  handleFotoSelect(e){
    console.log(e);
    console.log(e.target.files);
    this.setState({foto: e.target.files[0]});
  },
  handleAudioSelect(e){
    console.log(e);
    console.log(e.target.files);
     this.setState({sonido: e.target.files[0]});
  },

  render() {
   // console.log(this.props);
	
   if(this.state.showPorqueInput){
      return <PorqueInput nextStep={this.closePorque} primaryColor={this.props.primaryColor} value={this.state.porque}/>;
   } else {
  
 
 var style = {
    color: this.props.primaryColor
 }

var buttonText = {
    color: "#fff"
 }

 var buttonStyle = {
    backgroundColor: this.props.primaryColor,
    color: "#fff"
 }

var fileStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0px",
  left: "0px",
  opacity: 0
}
 var hexes = this.state.buttonArray.map(function(obj, index){
  var position = this.props.hexPositions[obj.positionIndex];
  var positionStyle = {
    top: position.top,
    left: position.left,
    width: this.props.hexWidth,
    height: this.props.hexHeight,
    display: "inline-block",
  position: "absolute"
  }
    

  var input = {};
  var innerText = (<p style={buttonText} className="ingresar-primary-heading">{obj.text}</p>);
  var backgroundColor = "#333";
  if(index==0){
    input = <input onChange={this.handleFotoSelect} type="file" style={fileStyle}/>
    if(this.state.foto!=null){
      backgroundColor = this.props.primaryColor;
      innerText = (<p style={buttonText} className="ingresar-inner-text">{this.state.foto.name}</p>);
    }
  } else if(index==1){
    input = <input onChange={this.handleAudioSelect} type="file" style={fileStyle}/>
     if(this.state.sonido!=null){
      backgroundColor = this.props.primaryColor;
      innerText = (<p style={buttonText} className="ingresar-inner-text">{this.state.sonido.name}</p>);
    }
  } else {
     if(this.state.porque!=null){
         backgroundColor = this.props.primaryColor;
         var textHint = this.state.porque.split(' ');
         var text = textHint[0];
         var max = Math.min(textHint.length, 20);
         for(var i = 1; i < max; i++){
           text+=" ";
          text+=textHint[i];
         }
         if(textHint.length > 20)text+="...";
         console.log(text);
         innerText = (<p style={buttonText} className="ingresar-inner-text">{text}</p>);
     }
  }
  var contents = (<div><img src={obj.img}/>{innerText}</div>);
   
   return(<div onClick={this.handleClick.bind(null, index)} className="hex-row" style={positionStyle}>
            <IngresarHex contents={contents} backgroundColor={backgroundColor} width={this.props.hexWidth} height={this.props.hexHeight}/>
            {input}
          </div>);
 }.bind(this));
   var hexContents = (<div><p style={style} className="ingresar-primary-heading">¿Por que?</p><p className="ingresar-secondary-heading">Elige una opción para justificar tu respuesta: </p></div>);

  // console.log(hexes);
  	return (
  		<div onBlur = {this.handleBlur} className={"ingresar-component "+this.props.selectedState}>
  			
            <IngresarHex  id="porque" contents={hexContents} position={this.props.hexPositions[2]} width={this.props.hexWidth} height={this.props.hexHeight}/>
            {hexes}
      </div>
  	);
  }
  }
});

export default Porque;