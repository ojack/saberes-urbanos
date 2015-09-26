import React from 'react';
var hex = [
    {number: 2, color: '#C1AFD1'},
    {number: 4, color: '#D6C9E0'},
    {number: 5, color: '#EAE4F0'},
    {number: 7, color: '#FFD6E0'},
    {number: 8, color: '#FFADC2'},
    {number: 9, color: '#FF85A3'},
    {number: 7, color: '#FF5C85'},
    {number: 6, color: '#FF3366'},
    {number: 4, color: '#BF264D'},
    {number: 4, color: '#801A33'}
    ];
var hex_radius = 48.5;
//width: @hex-size; height: (@hex-size * 1.7);
 // margin-left: (@hex-size / 1.30);

var HexGrid = React.createClass({
  getInitialState(){
    return ({hidden: false});
  },
  unfold(){
    console.log("unfold");
    var folded = this.state.hidden == true ? false : true;
    this.setState({hidden: folded});
  },
  render() {
     var topOffset = 55;
      var rightOffset = 12;
       var key = 0;
      var hexArray = hex.map(function(hex, index){
          var rowClass = index%2 == 0? "even" : "odd";
          var hexes = [];
          var right = (-index%2/2)*hex_radius*1.732;
        

          for(var i = 0; i < hex.number; i++){
              if(!this.state.hidden) right = (i-index%2/2)*hex_radius*1.732+rightOffset;
             var style = {
              backgroundColor: hex.color,
              top: index*(hex_radius*3/2)+topOffset,
              right: right,
              width: hex_radius, // actual width = sqrt(3)/2 * height
              height: hex_radius*1.7 // actual height is hex_radius*2
            }
            hexes.push( <div key={key} className='hex' style={style} ></div>);
            key++;
          }
          
          return ( 
                    {hexes}
                  );

         }.bind(this));
      // var hexContainerStyle={
      //   position: "absolute",
      //   top: "45px",
      //   right: "0px"
      // }
  	  return ( <div onMouseDown={this.unfold}>
               {hexArray}
            </div> )
   	}
  
});

export default HexGrid;