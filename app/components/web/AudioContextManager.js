import AudioProcessing from './../util/AudioProcessing'

var url = "https://s3-sa-east-1.amazonaws.com/observatorio-urbano/55f1bcec18cceb8f022a3eb1.mp3";

class AudioContextManager {
  constructor(){
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    this.context = new AudioContext();
    this.sounds = {};
    
  }
  addSound(id, url){
    var sound = new AudioProcessing(url, this.context, function(err){
      this.sounds[id] = sound;
    }.bind(this));

  }
  getVolume(id){
    return this.sounds[id].getVolume();
  }
  positionPanner(id, xPos, yPos, zPos){
    this.sounds[id].positionPanner(xPos, yPos, zPos);

  }
  // processSound(){
  //   var vol = this.sound.getVolume();
  //   console.log(vol);
  //   requestAnimationFrame(this.processSound);
  // }
  
}

export default AudioContextManager;