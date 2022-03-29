const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_id:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    images:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true,
    },
    jenis_kelamin:{
        type:String,
        trim:true,
        required:true
    },
    size:{
        type:String,
        trim:true,
        required:true
    },
    checked:{
        type:Boolean,
        dafault:false
    }
    

})



module.exports = mongoose.model("Product",productSchema)