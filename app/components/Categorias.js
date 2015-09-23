import React from 'react';

var Categorias = React.createClass({
 	getInitialState() {
    return {
      selected: null
    }
  },

  render() {
   var divStyle = {
      marginBottom: "30px"
   }
    var categorias = [];
	 for(var key in this.props.categorias){
    console.log(this.props.categorias[key]);
    var val = this.props.categorias[key].count;
    var fontSize = 16+ val*5;
     var style = {
      color: this.props.categorias[key].color,
      textTransform: "uppercase",
      fontWeight: "900"
    }
    style.fontSize = fontSize + "px";
    console.log(style);
    categorias.push(<div style={style}>{key}</div>);
   }
  	return (<div style={divStyle}>
             
             {categorias}
            </div>);
  	
  }
});

export default Categorias;