import React from 'react';
import BaseMap from './BaseMap';
import HexGrid from './HexGrid';
import Navigation from './Navigation';


var Main = React.createClass({

  render() {
  	  return(<div>
  	  			<BaseMap/>
  	  			<HexGrid/>
  	  			<Navigation/>
  	  		</div>)
   	}
  
});

export default Main;