const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
    role: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
schema.plugin(mongoosePaginate);
var UserModel = mongoose.model('user', schema);


module.exports = UserModel;