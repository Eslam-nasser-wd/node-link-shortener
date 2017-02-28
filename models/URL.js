// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('URL', new Schema({ 
    key: {type: String, required: true},
    long_url: {type: String, required: true},
    // short_url: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
}));