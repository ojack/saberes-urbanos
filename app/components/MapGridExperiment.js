import React from 'react';



class MapGridExperiment extends React.Component {
  render() {
  	var lat =  4.597+Math.random(-1, 1)*0.001;
	 var lng = -74.09;//+Math.random(-0.01, 0.01);
	 var width = 200;
	 var height = 200;
	 var rows = 7;
	 var cols = 8;
	 var triangles = [];

	 for(var j = 0; j < rows; j++){
		 for(var i = 0; i < cols; i++){
		 	var lat =  4.597+Math.random(-1, 1)*0.0001;
		 	var heading = 60;
		 	var pitch = j*10-40;
		 	var fov = 90;
		 	var imgSrc = "https://maps.googleapis.com/maps/api/streetview?size="+width+"x"+height+"&location="+lat+","+ lng+"&heading="+heading+"&pitch="+pitch+"&fov="+fov;
		  	console.log(imgSrc);
		  	
		  	var left = width*i;
		  	var top = height*(j*0.5-0.5);
		  	console.log(i+ " w: " + width);
		  	var className = (i+j)%2==0? "leftTriangle": "rightTriangle";
		  	var imgStyle = {
		  		position: "fixed",
		  		top: top+"px",
		  		left: left+"px"
		  	}
		  	var img = (<img style={imgStyle} className={className} src={imgSrc}/>);
		  	triangles.push(img);
		  }
	 }
  	
    return (
    	

    	<div id="container" >
 			{triangles}
		</div>
    );
  }
}

export default MapGridExperiment;