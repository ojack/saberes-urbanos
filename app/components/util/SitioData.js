
// TODO: one data set that is array of all data with only coordinates, other indexed by id
// IMPLEMENT QUADTREE for location data
// talk to DB

require('./lunr.es.js');
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
      return obj;
    }.bind(this));
    this.categorias = categorias;
    this.data = sit;
    this.currentSitios = sit;
    callback(null, {sitios: sit, categorias: categorias});
  }

  updateBounds(bbox){
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
            }
          }
        }
      }
    }
    this.currentSitios = sit;
    this.categorias = categorias;
    //console.log(this.currentSitios);
  }
  getByCategoria(query){
  
    
  
  }
  
}

export default SitioData;