var mongoose = require('mongoose'),
config = require('./../config');
//https://www.npmjs.com/package/mongoose-attachments

var SitioSchema = new mongoose.Schema({
	properties: {
		barrio: String,
		localidad: String,
		respuesta: String,
		direccion: String,
		porque: String,
		existente: Boolean,
		fotoUrl: String,
		fotoSmall: String,
		fotoMedium: String,
		fotoLarge: String,
	    sonidoUrl: String,
	    videoUrl: String,
	    created:  {type: Date, default: Date.now},
	    categoria: String
	},
	geometry: {
		'type': { type: String, default: "Point" },
		coordinates : [
			 {type: "Number"} // [<longitude>, <latitude>]
	    	  // create the geospatial index
		]
    },
   
    visible: Boolean
    
});

SitioSchema.index({ created: -1});


//TODO for production animalSchema.set('autoIndex', false);

 module.exports = mongoose.model('Sitio', SitioSchema);