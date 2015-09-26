import React from 'react';
import InfoWindow from './InfoWindow';

var InfoDetail = React.createClass({

  render() {
    var size = "250px";
  	var container_style = {
  		position: "fixed",
  		top: 0,
  		right: 0,
  		color: "#333",
  		width: "100%",
      height: "100%",
  		pointerEvents: 'none',
      backgroundColor: "rgba(255, 255, 255, 0.8)"
  	};
  	var streetview_style = {
  		  position: "absolute",
        top: "118px",
        right: "82px",
        width: size,
        height: size
  	};
  	var img_style = {
        position: "absolute",
        top: "480px",
        right: "207px",
        width: size,
        height: size
    };
    var porque_style = {
        position: "absolute",
        top: "263px",
        right: "251px",
        width: size,
        textAlign: "center",
        backgroundColor: "ff3366",
        color: "#fff",
        height: size
    };
    var text_style = {
      margin: "60px 40px"
    }
    console.log(this.props);
    var streetViewSrc = "https://maps.googleapis.com/maps/api/streetview?size=250x250&location="+this.props.coords.lat+","+this.props.coords.lng+"&heading=151.78&pitch=-0.76&AIzaSyCkTdSqnWG-3LoDikXJRmM4UFB1CaraARc";
  	
  	
  	  return(<div style={container_style}>
         
          <img className="hexClip" style={streetview_style} src={streetViewSrc}/>
          <div style={porque_style} className="hexClip">
            <div style={text_style}>
            {this.props.info.porque}
            </div>
            </div>
  	  		 <img className="hexClip" style={img_style} src={this.props.info.fotoUrl}/>
           <InfoWindow info = {this.props.info} />);
          </div>)
   	}
  
});

export default InfoDetail;