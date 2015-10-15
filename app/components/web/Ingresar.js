import React from 'react';
import Pregunta from './Ingresar/Pregunta'
import Porque from './Ingresar/Porque'
import Ubicacion from './Ingresar/Ubicacion'
//import smoothScroll from 'smooth-scroll'

var hexWidth = 245;
var hexHeight = 283;

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
    var hexPositions = [];
    for(var i = 0; i < 10; i++){
      var left = i%2 == 0? 0 : hexWidth/2;
      hexPositions[i] = {top: i*hexHeight*3/4, left: left}
    }
    return {
      step : 0,
      data: data,
      hexPositions: hexPositions
    }
  },
  handleResize(){
    var hexPositions = [];
     if(window.innerWidth > 612){
        for(var i = 0; i < 10; i++){
         
          var row = Math.floor(i/2);
          var left = i%2 == 0? 0: hexWidth;
          if(row%2 > 0){
            left += hexWidth/2;
          } else {
            if(row > 0) left+= hexWidth;
          }
          hexPositions[i] = {top: row*hexHeight*3/4, left: left}
        }
     } else {
        for(var i = 0; i < 10; i++){
          var left = i%2 == 0? 0 : hexWidth/2;
          hexPositions[i] = {top: i*hexHeight*3/4, left: left}
        }
     }
     this.setState({hexPositions: hexPositions});
  },
  updateData(val){
    console.log(val);
     var data = this.state.data;
     for(var i = 0; i < val.length; i++){
       data[val[i].attr]=val[i].value;
      }
      this.setState({
        data: data
    });
  },
  nextStep() {
    
    console.log("going to next step");
     
      this.setState({
        step : this.state.step + 1,
    }, function(){
      smoothScroll.animateScroll( null, '#porque' );
    });
  },
  cancelar(){
     console.log("cancelar called");
  },
  previousStep() {
    this.setState({
      step : this.state.step - 1
    })
  },
  componentDidMount(){
    window.addEventListener('resize', this.handleResize);
    smoothScroll.init();
    this.handleResize();
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
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
    updateData: this.updateData,
    cancelar: this.cancelar,
    data: this.state.data,
    hexWidth: hexWidth,
    hexHeight: hexHeight,
    hexPositions: this.state.hexPositions
  }

 var buttonStyle = {
    backgroundColor: "#ff3366",
    color: "#fff"
 }

var navigationStyle = {
  position: "fixed",
  bottom: "0px",
  left: "100px"
}; 

var containerStyle = {
    maxWidth: hexWidth*2.5,
    margin: "auto"
 }
 var formContents = [];
 // var formContents = [<Pregunta {...props} />, <Porque {...props}/>, <Ubicacion {...props}/>];
  console.log("step is "+ this.state.step);
  switch(this.state.step){
    case 0: 
          formContents.push(<Pregunta {...props} selectedState={"selected"}/>);
         break;
    case 1: 
           formContents.push(<Pregunta {...props}/>);
          formContents.push(<Porque {...props} selectedState={"selected"}/>);
         break;
    case 2: 
          formContents.push(<Pregunta {...props} />);
          formContents.push(<Porque {...props}/>);
          formContents.push(<Ubicacion {...props} selectedState={"selected"}/>);
         break;
    
     }
  	return (<div style={shadeStyle}>
              <div className="container">
                <div style={containerStyle}>{formContents}</div>
                <div style={navigationStyle}>
                  <button className="ingresar-continuar" style={buttonStyle} onClick={this.nextStep}> Continuar </button>
                  <h5 className="ingresar-cancelar" onClick={this.cancelar}> Cancelar </h5>
                </div>
              </div>
            </div>);
  	
  }
});

export default Ingresar;