import React from 'react';

var IngresarHex = React.createClass({

  render() {
   // console.log(this.props);
	
  var width = this.props.width;
  var height = this.props.height;
  var border = this.props.borderColor ? this.props.borderColor : "#ccc";
  var background = this.props.backgroundColor ? this.props.backgroundColor : "#000";
   var hexStyle={
      backgroundColor: border,
       width: width+"px", // actual width = sqrt(3)/2 * height
      height: height+"px",
      display: "block",
      position: "relative"
    };
     var innerHex={
      position: "absolute",
      backgroundColor: background,
      top: "1px",
      left: "1px",
      width: width-2+"px", // actual width = sqrt(3)/2 * height
      height: height-2+"px"
    };

     var hexplaceholder ={
    width: width,
    height: height,
    margin: "0px",
    float: "inherit",
   //marginRight: "0px",
  // float: "right",
    display: "inline-block",
    position: "relative"
  }
    var style = {
      color: "#ff3366"
    }
  	return (
  		 <div className="where " style={hexplaceholder}>   
          <div className="ingresar-hex" style={hexStyle}>
            <div className="ingresar-hex" style={innerHex}>
              
            </div>
          </div>
          <div className="ingresar-content-holder">
              <div className="ingresar-inner-contents">
                {this.props.contents}
              </div>
          </div>
        </div>
       
  	);
  
  }
});

export default IngresarHex;