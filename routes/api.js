var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var Sitio = require('./../models/sitios');
var config = require('./../config');
var fs = require('fs');
//var https = require('https');
var request = require('superagent');
var path = require('path');
var mkdirp = require('mkdirp');



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
    //     if(req.files){
    //     	if(req.files.foto){
    //     		var fileLoc = path.join(__dirname, config.fileStorage);
    //     		mkdirp(fileLoc, function (err) {
    //     			console.log(fileLoc);

   	// 			 if (err) {
   	// 			 	console.error(err)
    // 			}else {
    // 				fileLoc = path.join(fileLoc, String(sitio._id))+".jpg";
    // 				console.log(fileLoc);
    // 				console.log(req.files.foto[0].path);
    // 				fs.writeFile('test.png', "./../"+req.files.foto[0].path, function(err){
    // 					if (err) throw err;
  		// 				console.log('It\'s saved!');
    // 				});
    // 			}
				// });
    //     	// 	sitio.attach('foto', {path: req.files.foto[0].path}, function(err){
    //     	// 		if(err){
    //     	// 			console.log(err);
    //     	// 		} else {
    //     	// 			sitio.save(function(err){
    //     	// 				console.log(err);
    //     	// 			});
    //     	// 		}
    //     	// 	});
    //     	 }
    //     } else {
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