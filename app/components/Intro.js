import React from 'react';


var Intro = React.createClass({
getInitialState(){
	return {showVideo: false}
},
showVideo(){
	this.setState({showVideo: true});
},
componentDidMount(){
		var vid = document.getElementById("vid");
		vid.onended = function() {
			//alert("video ended");
		    this.props.nextStep();
		}.bind(this);
	},

  render() {
  	var videoStyle = {
		position: "fixed",
		top: "0px",
		left: "0px",
		width: "100%",
		height: "100%"
	};
	var closeButton = {};
	if(this.state.showVideo) {
		videoStyle.zIndex = 100;
		var closeStyle = {
			position: "fixed",
			top: "0px",
			right: "0px",
			zIndex: 101,
			fontSize: 28,
			fontWeight: "bold"
		}
		closeButton = (<div style={closeStyle} onClick={this.props.nextStep}> X </div>)
	}

	var headerStyle = {
		position: "fixed",
		top: "0px",
		left: "0px",
		width: "100%",
		padding: "31px"
	}

	var shadeStyle = {
		width: "100%",
		height: "100%",
		position: "fixed",
		top: "0px",
		left: "0px",
		backgroundColor: "rgba(0, 0, 0, 0.6)"
	}

	var introStyle = {
		textAlign: "center",
		height: "100%",
		maxWidth: "750px"
	}

	var playButtonStyle = {
		cursor: "pointer", 
		marginTop: "20px"
	}
	
  	  return( 
  	  	<div>
  	  		<video id="vid" style={videoStyle} autoPlay>
			  <source src="./video/enterprise-loop.mp4" type="video/mp4"/>
			Your browser does not support the video tag.
			</video>
			{closeButton}
	  	  	<div style={shadeStyle}></div>
	  	  		<div className="header" style={headerStyle}>
	  	  			<img src="./img/logo-complete-01.png"/>
	  	  		</div>
	  	  	<div className="container" style={introStyle}>
		  	  	<div className="row vertical-center"  >
		  	  		<h4 className="intro-text">El Observatorio de Saberes Bogotanos toma vida gracias a usted, a su amor y a sus experiencias vividas como habitante de la ciudad.</h4>
		  	  		<button className="button-large" onMouseDown={this.props.nextStep}>Entrar</button>
		  	  		<div style={playButtonStyle} onClick={this.showVideo}><img src="./img/play-button.png"/></div>
		  	  	</div>
	  	  	</div>
		</div>);
   	}
  
});

export default Intro;