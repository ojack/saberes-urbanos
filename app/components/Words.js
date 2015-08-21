import React from 'react';
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();
var list = [
 ['metropolitano', 12], 
 ['viviendas', 2],
 ['espacios', 6],
 ['urbanos', 6],
 ['humedales', 6],
 ['arte', 10],
 ['barrio', 6],
 ['ambulante', 4],
 ['iglesias', 6],
 ['verdes', 30],
 ['orientales', 30],
 ['comercial', 30],
 ['reservas', 30],
 ['pasaje', 30],
 ['obras', 30],
 ['almacén', 30],
 ['infantil', 30],
 ['quebradas', 30],
 ['alaedas', 30],
 ['bolsillo', 30],
 ['parques', 30],
 ['fábrica', 30],
 ['edificios', 30],
 ['conjunto', 30],
 ['imprenta', 30],
 ['academia', 30],
 ['canales', 30],
 ['arborizado', 30],
 ['formal', 30],
 ['almacen', 30],
 ['rios', 30],
 ['centro', 30],
 ['público', 30],
 ['zonal', 30],
 ['educación', 30],
 ['almacen', 30],
 ['barrio', 30],
 ['colegio', 30],
 ['taller', 30],
 ['vecinal', 30],
 ['ambulante', 30],
 ['conjuntos', 30],
 ['cerros', 30],
 ['jardín', 30],
 ['y/o', 30],
 ['corredores', 30],
 ['instituto', 30],
 ['forestales', 30],
 ['personajes', 30],
 ['viales', 30],
 ['públicos', 30],
 ['zonas', 30],
];

var Words = React.createClass({
getInitialState(){
	return {
		width: 100,
		height: 100
	}
},
 componentDidMount(){
 	this.setState({
 		width: window.innerWidth,
 		height: window.innerHeight
 	}, function(){
    for(var i = 0; i < list.length; i++){
      list[i][1] = Math.floor(Math.random()*30)+8
    }
    console.log(this.refs.canvas.getDOMNode())
   WordCloud(document.getElementById('canvas'), { list: list, fontFamily: 'monospace', color:'white', weightFactor: 2, backgroundColor: 'black', wait: 200, gridSize: 10, rotateRatio: 0.25} );
 
	});
 },
  render() {
  
    return (
      <div>
       <canvas id="canvas" ref="canvas" width={this.state.width} height={this.state.height} onTouchTap={this.props.nextStep} onMouseDown = {this.props.nextStep}/>
      </div>
    )
  }
});

export default Words;