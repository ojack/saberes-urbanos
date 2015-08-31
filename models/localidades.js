var mongoose = require('mongoose'),
config = require('./../config');
//https://www.npmjs.com/package/mongoose-attachments

var LocalidadSchema = new mongoose.Schema({
	'type': {type: String, default: "Feature"},
	properties: {
		OBJECTID: "Number",
		NOMBRE: String,
		DECRETO: String,
		COD_LOC_IN: "Number"
	},
	geometry: {
		'type': { type: String, default: "Polygon" },
		coordinates : [
			 {type: "Array"} 
		]
    }
});



//TODO for production animalSchema.set('autoIndex', false);

 module.exports = mongoose.model('Localidad', LocalidadSchema);