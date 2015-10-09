//import request from 'superagent';

var PouchDB = require('pouchdb');
PouchDB.plugin(require('geopouch'));
PouchDB.plugin(require('pouchdb-quick-search'));
// var lunr = require('lunr.js');
// require('./lunr.stemmer.support.js')(lunr);
require('./lunr.es.js');

var db = new PouchDB('saberes');

class SitioDB {
  constructor(){
      // var autoDB = minimongo.utils.autoselectLocalDb({namespace: "localdb"});
      window.PouchDB = PouchDB;
      db.info().then(function (info) {
      console.log(info);
      
    });
    //builds index so search will be faster
    db.search({
        fields: ['properties.respuesta', 'properties.porque', 'properties.categoria'],
          build: true,
          language: 'es'
        }).then(function (info) {
          // if build was successful, info is {"ok": true}
        }).catch(function (err) {
          // handle error
        });
  }

  addSitios(sitios){
   //delete sitios[0].__v;
   console.log(sitios);
   db.bulkDocs(sitios).then(function (result) {
  console.log(result);
    }).catch(function (err) {
      console.log(err);
    });
  // db.put(sitios[0]);
    db.info().then(function (info) {
      console.log(info);
    });
  }

  setBounds(bbox){
    // var ne = new mapboxgl.LngLat(bbox[0], bbox[1]);
    // var sw = new mapboxgl.LngLat(bbox[2], bbox[3]);
    // var bounds = new mapboxgl.LngLatBounds(sw, ne);
    var mins = [[bbox[2], bbox[3]], [bbox[0], bbox[1]]];
    console.log(mins);
  //   db.spatial(function (doc) {
  //    // console.log(doc);
  //     emit(doc.geometry);
  // }, bbox, function(err, result){console.log(err); console.log(result)});
     db.spatial(function (doc) {
        //console.log(doc.geometry);
        emit(doc.geometry);
      },mins).then(function (resp) {
          console.log("return spatial");
          console.log(resp);
        
      });
    // }).catch(err);

    //.then(function (result) { console.log(result)}, function (err) {});
  }
  getCategoria(query, callback){
    db.query(function (doc, emit) {
      emit(doc.properties.categoria);
    }, {key: query}).then(function (result) {
      callback(null, result.rows);
    }).catch(function (err) {
      callback(err, null);
    });
  }
  searchSitios(query, callback){
    db.search({
      query: query,
      fields: ['properties.respuesta', 'properties.porque', 'properties.categoria'],
      include_docs: true,
      limit: 10,
      mm: '50%',
      language: 'es'
  }, function (err, res) {
      if (err) {
        // handle error
        callback(err, null);
      } else {
        console.log("search");
        callback(null, res);
        // handle results
      }
  });
  }
  
}

export default SitioDB;