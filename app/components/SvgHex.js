import React from 'react';



class SvgHex extends React.Component {
  render() {
  	console.log(this.props);
  	var imgSrc = "https://maps.googleapis.com/maps/api/streetview?size=250x250&location="+this.props.coords.lat+","+this.props.coords.lng+"&heading=151.78&pitch=-0.76&AIzaSyCkTdSqnWG-3LoDikXJRmM4UFB1CaraARc";
  	console.log(imgSrc);
  	var i = (<img src={imgSrc}/>);
  	// var containerStyle = {
  	// 	position: "fixed",
  	// 	top: "20px",
  	// 	right: "20px"
  	// }
    return (
    	

    	<div>
 			{i}
		</div>
    );
  }
}

export default SvgHex;