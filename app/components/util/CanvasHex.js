//import request from 'superagent';


class CanvasHex {
  constructor(rad, imgSrc){
    var canvas = document.createElement('canvas');
     this.ctx = canvas.getContext('2d');
    canvas.width = rad*4;
    canvas.height = rad*4;
   
    var img = new Image();
    
    img.onload = function(){
      this.ctx.drawImage(img, 0, 0);
      console.log("img loaded");
     
      this.ctx.restore();
      //callback(canvas);
    }.bind(this);
    img.src = imgSrc;
    console.log(img);
    this.rad = rad;
    //this.ctx.fillStyle ="#f36";
    this.ctx.save();
    this.ctx.beginPath();
    this.drawHex();
    this.ctx.closePath();
    this.ctx.clip();
    this.canvas = canvas;
      //this.ctx.fill();
  }
 
  drawHex(){
  
    var angle;
     for (var i = 0; i <= 6; i++) {
        angle = i * 2 * Math.PI / 6;
       
        this.ctx.lineTo(this.rad + this.rad * Math.cos(angle), this.rad + this.rad * Math.sin(angle));
      }
      
    //ctx.fillRect(Math.floor(coords.x)-rad/2, Math.floor(coords.y)-rad/2,rad, rad);

  }
}

export default CanvasHex;