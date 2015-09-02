var mongoose = require('mongoose'),
config = require('./../config');
//https://www.npmjs.com/package/mongoose-attachments

var BarrioSchema = new mongoose.Schema({
	properties: {
		OBJECTID: Number,
		NOMBRE: String,
		COD_LOC_IN: Number
	},
	bbox: [],
	"type":  {type: String, default: "Feature"},
	geometry: {
		'type': { type: String, default: "Polygon" },
		coordinates : []
    }
}, {collection: 'barrios'});




//TODO for production animalSchema.set('autoIndex', false);

 module.exports = mongoose.model('Barrios', BarrioSchema);