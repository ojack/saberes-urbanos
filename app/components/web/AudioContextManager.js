import AudioProcessing from './../util/AudioProcessing'

var url = "https://s3-sa-east-1.amazonaws.com/observatorio-urbano/55f1bcec18cceb8f022a3eb1.mp3";

/* DONE:
only play two sounds at a time
if more sounds are visible, update
only play sounds that are within current view

/*to do:
cycle through sounds so not alsways the same
panning
object keeping track of currently playing sounds and volume updated within audio context manager
call(updateAudioVolumes from within react get animation frame)
*/


var MAX_SOUNDS = 2;

class AudioContextManager {
  constructor(){
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    this.context = new AudioContext();
    this.gain = this.context.createGain();
    this.sounds = {};
    this.gain.connect(this.context.destination);
    this.mute();
    this.currSounds = [];
  }
  /*loads sound from url and initializes audio processing object*/
  addSound(id, url){
    var sound = new AudioProcessing(url, this.context, this.gain, function(err){
      this.sounds[id] = sound;
      //sound.playSound();
    }.bind(this));

  }
  updateSoundArray(soundIndexes){
  //  console.log(soundIndexes);
   // console.log(this.sounds);
    var newSounds = [];
    var max = Math.min(MAX_SOUNDS, soundIndexes.length);

    for(var i = 0; i < max; i++){
      if(this.sounds.hasOwnProperty(parseInt(soundIndexes[i]))){
        newSounds.push(parseInt(soundIndexes[i]));
      }
    }
    var currPlaying =[];
    for(var i = 0; i < this.currSounds.length; i++){
      //console.log(this.sounds[parseInt(this.currSounds[i])]);
      var repeatSound = false; 
      for(var j = 0; j < newSounds.length; j++){
        if(this.currSounds[i] == newSounds[j]) {
          repeatSound = true;
          currPlaying.push(this.currSounds[i]);
          newSounds.splice(j, 1);
        }
      }
      if(!repeatSound) this.sounds[parseInt(this.currSounds[i])].stopSound();
    }
   // console.log(newSounds);
    for(var i = 0; i< newSounds.length; i++){
       // console.log(newSounds[i]);
       // console.log(this.sounds[parseInt(newSounds[i])]);
        this.sounds[parseInt(newSounds[i])].playSound();
        currPlaying.push(newSounds[i]);
      
    }
    this.currSounds = currPlaying;
    // console.log(this.currSounds);
  }
  getVolume(id){
    return this.sounds[id].getVolume();
  }
  mute(){
   // console.log("setting gain");
    this.gain.gain.value = 0;
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