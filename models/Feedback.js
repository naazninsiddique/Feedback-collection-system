const mongoose = require('mongoose');
const feedbackschema = new mongoose.Schema({
    name:String,
    contactNumber:String,
    email:String,
    feedback:String
});
module.exports = mongoose.model('feedback',feedbackschema);