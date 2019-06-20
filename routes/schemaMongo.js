const mongoose = require('mongoose');
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "name" : String,
    "poster-image" : String,
};

const User = module.exports = mongoose.model('list',userSchema);
// create model if not exists.
module.exports.findBySearch = function (data,callback){
    
}
module.exports.paginationData = function (data,callback){
    
}
module.exports.addUser = function (User,callback){
    User.save(callback)
}



