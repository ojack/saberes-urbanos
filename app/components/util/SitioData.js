
// TODO: one data set that is array of all data with only coordinates, other indexed by id
// IMPLEMENT QUADTREE for location data
// possibly: only update whats current list when mouse up
// talk to remote DB
//on upload get barrio and localidad on server side
var lunr = require('lunr');
require('./lunr.stemmer.support.js')(lunr);
require('./lunr.es.js')(lunr);

import request from 'superagent';

var data = [];
var colorArray = [
     '#FF85A3',
     '#FF5C85',
     '#FF3366',
     '#BF264D',
     '#801A33'
    ];

class SitioData {
  constructor(callback){
     request
       .get('/api/sitios')
       .query({ limit: 50 })
       .end(function(err, res){
         // console.log(res.body);
          if(err){
            callback(err, null);
          } else {
            this.addSitios(res.body, callback);
          }
          //this.setState({sitios: res.body}, this.addGeoJSON);
       }.bind(this));

     this.idx = lunr(function () {
    // use the language (de) 
    this.use(lunr.es);
    // then, the normal lunr index initialization 
    this.field('respuesta', { boost: 10 });
    this.field('categoria');
    this.field('porque');
    this.ref('tempId');
});
       //var idx = lunr(function () {
    // use the language (de) 
    //   this.use(lunr.es);
    // // then, the normal lunr index initialization 
    //   this.field('title', { boost: 10 })
    //   this.field('body')
   // });
  }

  addSitios(sitios, callback){
    var categorias = {};
    var sit = sitios.map(function(obj, index){
      obj.properties.tempId = index;
      delete obj.__v;
      if(obj.properties.sonidoUrl){
        console.log(" has sound "+ obj.properties.sonidoUrl);
       // this.audioContext.addSound(index, obj.properties.sonidoUrl);
        obj.properties.hasSound = true;
      } else {
        obj.properties.hasSound = false;
      }
      var cat = obj.properties.categoria;
       if(cat){
         if(categorias.hasOwnProperty(cat)){
           categorias[cat].count +=1;
         } else {
           categorias[cat] = {count: 0, color: colorArray[Math.floor(Math.random()*colorArray.length)]};
          
         }
         obj.properties.color = categorias[cat].color;
       } else {
          obj.properties.color = "#ff3366";
       }
       this.idx.add(obj.properties);

      // console.log(obj.properties);
      return obj;
    }.bind(this));
    this.categorias = categorias;
    this.data = sit;
    this.currentSitios = sit;
    callback(null, {sitios: sit, categorias: categorias});
  }

  updateBounds(bbox){
    this.text = {};
    var minLng = bbox._sw.lng;
    var minLat = bbox._sw.lat;
    var maxLng = bbox._ne.lng;
    var maxLat = bbox._ne.lat;
    var sit = [];
    var categorias = {};
    //console.log(bbox);
    for(var i = 0; i < this.data.length; i ++){
      var obj = this.data[i];
      if(obj.geometry.coordinates[1] > minLat){
        if(obj.geometry.coordinates[1] < maxLat){
          if(obj.geometry.coordinates[0] < maxLng){
            if(obj.geometry.coordinates[0] > minLng){
              sit.push(obj);
              var cat = obj.properties.categoria;
              if(cat){
                if(categorias.hasOwnProperty(cat)){
                        categorias[cat].count +=1;
                } else {
                   categorias[cat] = {count: 0, color: colorArray[Math.floor(Math.random()*colorArray.length)]};
          
                }
              }
              //this.processText(obj);
            }
          }
        }
      }
    }
    //console.log(this.text);
    this.currentSitios = sit;
    this.categorias = categorias;
    //console.log(this.currentSitios);
  }
  getWords(){
    for(var i = 0; i < this.currentSitios.length; i++){
      this.processText(this.currentSitios[i]);
    }
    var textArray =[];
   for(var obj in this.text){
    textArray.push({word: obj, count: this.text[obj]});
   }
   textArray.sort(function(a,b) {
      return b.count - a.count;
    });
    return textArray;
  }
  processText(obj){
    if(obj.properties.porque!=null) this.addKeyWords(obj.properties.porque);
     if(obj.properties.categoria!=null) this.addKeyWords(obj.properties.categoria);
     if(obj.properties.respuesta!=null) this.addKeyWords(obj.properties.respuesta);
   if(obj.properties.barrio!=null) this.addKeyWords(obj.properties.barrio);
   //put in array and sort by cound, descending

  }
  addKeyWords(string){
     var res = this.tokenizer(string);
     //console.log(res);
      for(var i = 0; i < res.length; i++){
        var token =this.trimmer(res[i]);
        //console.log(this.idx);
        if(lunr.es.stopWordFilter(token)){
          if(this.text.hasOwnProperty(token)){
            this.text[token]++;
          } else {
            this.text[token] = 1;
          }
        }
      }
  }
  tokenizer(obj){
    if (!arguments.length || obj == null || obj == undefined) return []
  if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

  return obj.toString().trim().toLowerCase().split(/[\s\-]+/)
  }
  trimmer(token){
     var result = token.replace(/^\W+/, '')
                    .replace(/\W+$/, '')
      return result === '' ? undefined : result
  }
  searchString(string){
    console.log(this.idx);
   // console.log( lunr.es.stopWordFilter.stopWords.elements);
    var docs = this.idx.search(string);
    console.log(docs);
    for(var i = 0; i < docs.length; i ++){
      console.log(this.data[docs[i].ref]);
    }
    //to do: use lunr.js
  }
  
}

export default SitioData;