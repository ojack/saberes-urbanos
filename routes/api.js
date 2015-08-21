var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var Sitio = require('./../models/sitios');
var config = require('./../config');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

router.post('/sitios', function(req, res, next) {
        console.log(req.body);
        var sitio = new Sitio({
  barrio: "barrio",
  localidad: "Santa Fe",
  nombre: "hey",
  coords: [90.23980, -98.9]
   
});

        sitio.save(function(err){
          if (err) {
            console.log(err);
          }
        
        });
          //   var sitio = new Sitio({
       
});

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
        data.coords = req.body.coords.split(',');
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
        				});
      //  }
        console.log(sitio._id);
        console.log(sitio.coords);
      
        res.end();
  		}
      });
});


module.exports = router;