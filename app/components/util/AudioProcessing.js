//import request from 'superagent';


var HEIGHT = 400;
var WIDTH = 600;
var audioBuffer = null;
var source = null; 

class AudioProcessing {
  constructor(url, context, callback){
//window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var analyser = context.createAnalyser();
    var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      //audioBuffer = buffer;
     source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
   
  source.connect(analyser);
   

    this.analyser = analyser;
   
    // this.visualize();


  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0); 
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