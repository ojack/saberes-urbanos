var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new mongoose.Schema({
	username: String,
	password: String
    
},  {collection: 'accounts'});

AccountSchema.plugin(passportLocalMongoose);


//TODO for production animalSchema.set('autoIndex', false);

 module.exports = mongoose.model('Account', AccountSchema);