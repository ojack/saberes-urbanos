import React from 'react';
import IngresarHex from './IngresarHex';
import PorqueInput from './PorqueInput';

//  top: -70px;
// left: 122px;
var width = 245;
var height = 283;

var buttonArray = [
  {text: "sube una foto", img: "./../img/ingresar-foto.png", position: {top: 0, left: 0}},
  {text: "sube un audio", img: "./../img/ingresar-audio.png", position:{top: -height/4, left: width/2}},
  {text: "escribe algo", img: "./../img/ingresar-escribir.png", position:{top: -height/4, left: width/2}}
];

var Porque = React.createClass({
 getInitialState() {
    return {
      value : this.props.value,
      buttonArray: buttonArray,
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
  handleResize(){
    console.log(window.innerWidth);
    var bArray = this.state.buttonArray;
    if(window.innerWidth > 612){
      console.log("resizing");
      bArray[0].position = {top: 0, left: 0};
      bArray[1].position = {top: -height/4, left: width/2};
      bArray[2].position = {top: -height/4, left: width/2};
    } else {  
      bArray[0].position = {top: -height/4, left: width/2};
      bArray[1].position = {top: -height/2, left:0};
      bArray[2].position = {top: -height*(3/4), left: width/2}; 
    }
    this.setState({bArray: buttonArray});
  },
  componentDidMount(){
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  render() {
   // console.log(this.props);
	
   if(this.state.showPorqueInput){
      return <PorqueInput nextStep={this.closePorque} primaryColor={this.props.primaryColor} value={this.state.porque}/>;
   } else {
  var data = [
    { attr: "sonido", value: this.state.sonido},
    { attr: "foto", value: this.state.foto},
    { attr: "porque", value: this.state.porque}
  ]
 
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

 var containerStyle = {
    maxWidth: width*2.5,
    margin: "auto"
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
  var positionStyle = {
    top: obj.position.top,
    left: obj.position.left,
    display: "inline-block",
  position: "relative"
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
            <IngresarHex contents={contents} backgroundColor={backgroundColor} width={width} height={height}/>
            {input}
          </div>);
 }.bind(this));
   var hexContents = (<div><p style={style} className="ingresar-primary-heading">¿Por que?</p><p className="ingresar-secondary-heading">Elige una opción para justificar tu respuesta: </p></div>);

  // console.log(hexes);
  	return (
  		<div style={containerStyle}>
  			
            <IngresarHex contents={hexContents} width={width} height={height}/>
            {hexes}
          <button className="ingresar-continuar" style={buttonStyle} onClick={this.props.nextStep.bind(null, data)}> Continuar </button>
          <h5 className="ingresar-cancelar" onClick={this.props.cancelar}> Cancelar </h5>
  
      </div>
  	);
  }
  }
});

export default Porque;