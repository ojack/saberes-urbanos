import React from 'react';
import Intro from './Intro';
import Main from './Main';
import WebMap from './WebMap';


var Web = React.createClass({
  getInitialState() {
    return {
      step : 0
    }
  },
  nextStep() {
    console.log("going to next step");
    this.setState({
      step : this.state.step + 1
    })
  },

  previousStep() {
    this.setState({
      step : this.state.step - 1
    })
  },

  render() {
  	switch(this.state.step){
  		case 0: 
       	 return (<Intro nextStep={this.nextStep}/>)
       	case 1: 
       		 return <WebMap nextStep={this.nextStep} />
   	}
  }
});

export default Web;