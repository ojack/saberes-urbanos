var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var Sitio = require('./../models/sitios');
var Localidad = require('./../models/localidades');
var Barrio = require('./../models/barrios');
var config = require('./../config');
var fs = require('fs');
var aws = require('aws-sdk'); 
//var https = require('https');
var request = require('superagent');
var path = require('path');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;
var S3_BUCKET_RESIZE = process.env.S3_BUCKET_RESIZE;

var cpUpload = upload.fields([{ name: 'foto' }, { name: 'sonido' }, { name: 'data'}, {name: 'localidad'}, {name: 'barrio'}])




router.post('/upload', function(req, res) {
  cpUpload(req, res, function(err){
      if(err) {
        console.log(err);
      } else {
      //   console.log(JSON.parse(req.body.data));
      console.log(req.body);
        console.log(req.files);
        var data = req.body;
        var coords = req.body.coords.split(',');
        data.geometry = {};
        data.geometry.coordinates = coords;
        data.properties = Object.assign({}, data); //hacky, fix this maybe use functions in mongoose
        console.log(data);
        var sitio = new Sitio(data);
   
        	sitio.save(function(err){
        					if (err) console.log;
                     console.log(sitio);
        				});
      //  }
    //    console.log(sitio._id);
     
      
        res.end();
  		}
      });
});

router.post('/update-sitio', function(req, res){

 // console.log(req);
  console.log(req.body);
  var data = req.body;
        var coords = [req.body.coords.lng, req.body.coords.lat];
        data.geometry = {};
        data.geometry.coordinates = coords;
        //data.properties = Object.assign({}, data); //hacky, fix this maybe use functions in mongoose
        console.log(req.body.id);

        var conditions = { _id: req.body.id };
        var set = {};
        for (var field in data) {
          set['properties.' + field] = data[field];
        }
        set["geometry"]= data.geometry;
        var options = {};

        Sitio.update(conditions, set, options, function(err, numAffected){
                  if (err) res.write("ERROR: "+ err);
                  
                if(data.foto_name){
                  getAWSkey(data.foto_name, data.foto_type, req.body.id, function(err, return_data){
                    if(err) {
                      console.log(err)
                    } else {
                      var bucketInfo = {};
                      bucketInfo.foto = return_data;
                      
                      if(data.sonido_name){
                        getAWSkey(data.sonido_name, data.sonido_type, req.body.id, function(err, sonido_data){
                          bucketInfo.sonido = sonido_data;
                          res.write(JSON.stringify(bucketInfo));
                          res.end();
                        });

                      } else {
                        res.write(JSON.stringify(bucketInfo));
                        res.end();
                      }
                    }
                  });
              } else {
                  if(data.sonido_name){
                        getAWSkey(data.sonido_name, data.sonido_type, req.body.id, function(err, sonido_data){
                         
                          res.write(JSON.stringify({sonido: sonido_data}));
                          res.end();
                        });

                      } else {
                        res.end();
                      }
              }
                     

                
      });

});


router.delete('/sitio', function(req, res){
  console.log(req.query.id);
Sitio.findOne({_id: req.query.id}, function(err, doc){
  if(err){
    res.json(404, null);
  } else {
 // res.json(202, doc);
  // for(var key in doc.properties){
  //   console.log(key);
  //   console.log(doc.properties[key]);
  // }
   console.log(doc.properties.fotoUrl);
    if(doc.properties.fotoUrl){
      deleteObjects(S3_BUCKET, [doc.properties.fotoUrl], function(err){
        if(err) {
          console.log(err);
        } else {
           console.log(err);
        }
      });
    }
    if(doc.properties.fotoSmall){
      //TODO: error check here
      var photoArray = [doc.properties.fotoSmall, doc.properties.fotoMedium, doc.properties.fotoLarge];
       deleteObjects(S3_BUCKET_RESIZE, photoArray, function(err){
        if(err) {
          console.log(err);
        } else {
           console.log(err);
        }
      });
    }
    doc.remove();
    res.json(202);
   }
});
  
});

function deleteObjects(bucket, filePaths, callback){
  var s3 = new aws.S3();
  console.log("deleting "+ filePaths);
  var keys = filePaths.map(function(filePath){
    var name = path.basename(filePath);
    console.log(name);
    return {Key: name}
  });
  console.log(keys);
    var params = {
        Bucket: bucket,
        Delete: {
          Objects: keys
        }
    };
    console.log(params);
    s3.deleteObjects(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
}

router.put('/add-url', function(req, res){
    var conditions = { _id: req.body.id };
    var type = "properties.fotoUrl";
    var update = {};
    if(req.body.type == "sonido") {
      update["properties.sonidoUrl"] = req.body.url;
    } else {
      var ext = path.extname(req.body.url);
      update["properties.fotoUrl"] = req.body.url;
     update["properties.fotoSmall"] = 'https://'+S3_BUCKET_RESIZE+'.s3.amazonaws.com/'+path.basename(req.body.url, ext) + "-small" + ext;
     update["properties.fotoMedium"] = 'https://'+S3_BUCKET_RESIZE+'.s3.amazonaws.com/'+path.basename(req.body.url, ext) + "-medium" + ext;
     update["properties.fotoLarge"] = 'https://'+S3_BUCKET_RESIZE+'.s3.amazonaws.com/'+path.basename(req.body.url, ext) + "-large" + ext;
    }
    
   console.log(update["properties.fotoSmall"]);
   console.log(update);
    var options= {};
 // , options = { multi: true };


Sitio.update(conditions, update, options, function(err, numAffected){
  console.log(err);
   console.log(numAffected + " documents affected");
   if(err){
    res.end(err);
  } else {
    res.end();
  }
});


}); 



router.get('/sitios', function(req, res, next) {  
    var limit = req.query.limit || 40;

    // find a location
    Sitio.find().limit(limit).sort({created: -1}).exec(function(err, locations) {
      if (err) {
      	console.log(err);
        return res.json(500, err);
      }
       console.log("found");
      console.log(locations);
      res.json(200, locations);
    });
});

router.post('/add-sitio', function(req, res){

 // console.log(req);
  console.log(req.body);
  var data = req.body;
        var coords = [req.body.coords.lng, req.body.coords.lat];
        data.geometry = {};
        data.geometry.coordinates = coords;
        data.properties = Object.assign({}, data); //hacky, fix this maybe use functions in mongoose
        console.log(data);
        var sitio = new Sitio(data);
   
          sitio.save(function(err){
                  if (err) res.write("ERROR: "+ err);
               
                if(data.foto_name){
                  getAWSkey(data.foto_name, data.foto_type, sitio._id, function(err, return_data){
                    if(err) {
                      console.log(err)
                    } else {
                      var bucketInfo = {};
                      bucketInfo.foto = return_data;
                      
                      if(data.sonido_name){
                        getAWSkey(data.sonido_name, data.sonido_type, sitio._id, function(err, sonido_data){
                          bucketInfo.sonido = sonido_data;
                          res.write(JSON.stringify(bucketInfo));
                          res.end();
                        });

                      } else {
                        res.write(JSON.stringify(bucketInfo));
                        res.end();
                      }
                    }
                  });
              } else {
                  if(data.sonido_name){
                        getAWSkey(data.sonido_name, data.sonido_type, sitio._id, function(err, sonido_data){
                         
                          res.write(JSON.stringify({sonido: sonido_data}));
                          res.end();
                        });

                      } else {
                        res.end();
                      }
              }
                     

                
      });

});

function getAWSkey(file_name, file_type, id, callback){
  console.log("getting AWS key");
   var key = String(id).split('').reverse().join('');//reverse id for better indexing in AWS
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  var name = key + path.extname(file_name);
   console.log(name);
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: name,
        Expires: 60,
        ContentType: file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+name,
                id: id
            };
            console.log(JSON.stringify(return_data));
            callback(null, return_data);
        }
    });
}
router.get('/sign_s3', function(req, res){
    console.log(S3_BUCKET);
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            console.log(JSON.stringify(return_data));
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

router.get('/barrios', function(req, res, next) {  
    console.log("received localidades request");
    var code = req.query.code || 4;
   var bbox = req.query.bbox || false;
     var query =  {properties: true, _id: true};
     if(bbox){
      query.bbox = true;
     }
    Barrio.find({"properties.COD_LOC_IN": code}, query).exec(function(err, barrios) {
      if (err) {
        console.log(err);
        return res.json(500, err);
      }
       console.log("found barrios");
      console.log(barrios);
      res.json(200, barrios);
    });
});

router.get('/localidades', function(req, res, next) {  
    console.log("received localidades request");
    // find a location
     var bbox = req.query.bbox || false;
     var query =  {properties: true, _id: true};
     if(bbox){
      query.bbox = true;
     }
    Localidad.find({}, query).exec(function(err, locations) {
      if (err) {
        console.log(err);
        return res.json(500, err);
      }
       console.log("found");
      console.log(locations);
      res.json(200, locations);
    });
});

//Geocode using bing geocoder. TODO: check whether within bounds of bogota
router.get('/geocode', function(req, res, next) {  
	var base_url = 'https://dev.virtualearth.net/REST/v1/Locations?';
			//var query = "1%20Microsoft%20Way%20Redmond%20WA%2098052";
			console.log(req.query);
			var query = encodeURIComponent(req.query.query+ ", Bogotá, Colombia");
			var location = encodeURIComponent(req.query.lat+","+req.query.lng);
			console.log(req.query.query);
			var query_string = base_url+"query="+query+"&c=es-MX&includeNeighborhood=1&include=queryParse&userLocation="+location+"&key="+config.bingKey;
			console.log(query_string);
			var response = res;
			
		   request.get(query_string)
		   .end(function(err, r){
		   		console.log(r.body);
		   		if(err){
		   			response.json(500, err);
		   		} else {
			   		var data = r.body.resourceSets[0];
			   		if(data.estimatedTotal > 0){
			   			var points = data.resources[0].geocodePoints[0].coordinates;
			   			response.json(200, {coords: {lat: points[0], lng: points[1]}});
				 // 			if(points!=null){
				 // 				this.props.updateLatLng(points[0], points[1]);
				 // 				//TODO ! make sure points inside bogota
				 // 			}
			   		} else {
			   			response.json(500, "no results");
			   		}
			   		
			   		
		   		}
		   		
		   }.bind(this));

});

module.exports = router;