import React from 'react';
import CanvasHex from './../util/CanvasHex'


var Experiment = React.createClass({
 
 componentDidMount(){
    var url = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSrrglfsI5q0J9bx2gAOEa5dI2dQDSEGhuKaV-u5UxLnhrmuvE";
    var hex = new CanvasHex(100, url, function(hex){
      console.log("rendered hex");
       document.body.appendChild(hex);
    });
  },
  render() {
  	return(<div> EXPERIMENT </div>);
  }
});

export default Experiment;