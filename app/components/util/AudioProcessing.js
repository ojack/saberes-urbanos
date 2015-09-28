//import request from 'superagent';


var HEIGHT = 400;
var WIDTH = 600;
var audioBuffer = null;
var source = null; 

class AudioProcessing {
  constructor(url, context, callback){
//window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var analyser = context.createAnalyser();
   var panner = context.createPanner();
//   panner.panningModel = 'HRTF';
// panner.distanceModel = 'inverse';
// panner.refDistance = 1;
// panner.maxDistance = 10000;
// // panner.rolloffFactor = 1;
// panner.coneInnerAngle = 360;
// panner.coneOuterAngle = 0;
// panner.coneOuterGain = 0;
// panner.setOrientation(1,0,0);
this.panner = panner;
    var listener = context.listener;
    var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  //listener.setPosition(window.innerWidth/2, window.innerHeight/2, 0);
  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      //audioBuffer = buffer;
     source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.loop = true;
  source.connect(analyser)
  analyser.connect(this.panner);

  //source.connect(analyser);
   
    // this.visualize();


  this.panner.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0); 
    this.analyser = analyser;
  callback(null); 
    }.bind(this),  function(error) {
        callback(error);
        console.error('decodeAudioData error', error);
      });
  }.bind(this);
  request.send();
   
    console.log(url);
    //  var input = context.createMediaStreamSource(stream);
   

    // var analyser = context.createAnalyser();

    // // Connect graph.
    // input.connect(analyser);
   

    // this.analyser = analyser;
   
    // this.visualize();
    //  console.log(context);
   
  }
  getVolume(){
        var freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(freqDomain);
        var values = 0;
        var average;
 
        var length = freqDomain.length;
 
        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += freqDomain[i];
        }
 
        average = values / length;
        return average;
   
  }
  positionPanner(xPos, yPos, zPos) {
    var x = -20*(window.innerWidth/2-xPos)/(window.innerWidth/2);
    var y = -20*(window.innerHeight/2-yPos)/(window.innerWidth/2);
    //console.log(x, y);
    this.panner.setPosition(x,y, zPos);
  }
  visualize(){
     console.log("visualizing");
      var freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(freqDomain);
   // console.log(freqDomain);
  //  //draw viz
  //   this.drawContext.clearRect(0, 0, WIDTH, HEIGHT);
  //   for (var i = 0; i <freqDomain.length; i++) {
  // var value = freqDomain[i];
  // var percent = value / 256;
  // var height = HEIGHT * percent;
  // var offset = HEIGHT - height - 1;
  // var barWidth = WIDTH/freqDomain.length;
  // var hue = i/freqDomain.length * 360;
  // this.drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
  // this.drawContext.fillRect(i * barWidth, offset, barWidth, height);
//}
   // console.log(freqDomain);
  // requestAnimationFrame(this.visualize.bind(this));
  }
}

export default AudioProcessing;