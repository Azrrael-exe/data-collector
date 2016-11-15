var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

// define the schema for our user model
var surveyResponseSchema = mongoose.Schema({
  author : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project : String,
  responseID : Number,
  name : {
    firstname: String,
    secondname: String,
    firstsurename: String,
    seconndsurename: String
  },
  contact: {
    phonenumber : String,
    celnumber : String
  },
  ubication : {
    country: String,
    city: String,
    address: String,
    coordinates : {
      latitude : Number,
      longitude : Number
    }
  },
  responses : [{question: String, response: String}]
});

//  ==== methods ====

surveyResponseSchema.plugin(autoIncrement.plugin, { model: 'Survey', field: 'Number'});

// create the model for users and expose it to our app
module.exports = mongoose.model('Survey', surveyResponseSchema);
