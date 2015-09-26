import React from 'react';
import AudioProcessing from './util/AudioProcessing'

var url = "https://s3-sa-east-1.amazonaws.com/observatorio-urbano/55f1bcec18cceb8f022a3eb1.mp3";
var SoundIcon = React.createClass({
  componentDidMount(){
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var context = new AudioContext();
    this.sound = new AudioProcessing(url, context, function(err){
      this.processSound();
    }.bind(this));
  },
  processSound(){
    var vol = this.sound.getVolume();
    console.log(vol);
    requestAnimationFrame(this.processSound);
  },
  render() {
  	
  	
  	  return(<div>
  	  	SoundTest
          </div>)
   	}
  
});

export default SoundIcon;