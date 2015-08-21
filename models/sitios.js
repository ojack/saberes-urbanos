var mongoose = require('mongoose'),
crate = require('mongoose-crate'),
 LocalFS = require('mongoose-crate-localfs'),
config = require('./../config');;
//https://www.npmjs.com/package/mongoose-attachments

var SitioSchema = new mongoose.Schema({
	barrio: String,
	localidad: String,
	respuesta: String,
	porque: String,
	existente: Boolean,
	coords: {
	    type: [Number],  // [<longitude>, <latitude>]
	    index: '2d'      // create the geospatial index
    },
    fotoUrl: String,
    sonidoUrl: String,
    videoUrl: String,
    visible: Boolean,
    created:  {type: Date, default: Date.now}
});

SitioSchema.plugin(crate, {
  storage: new LocalFS({
    directory: config.fileStorage
  }),
  fields: {
    foto: {},
    sonido: {}
  }
})


 module.exports = mongoose.model('Sitio', SitioSchema);