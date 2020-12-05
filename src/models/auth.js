const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    refCode:{
        type:String,
        required:true,
    },
    data:{
        type:Date,
        default:Date.now,
    }

});

module.exports = Auth = mongoose.model("Auth",AuthSchema); 