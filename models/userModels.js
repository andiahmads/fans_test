const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nama_lengkap:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    no_hp:{ 
        type:Number,
        default:0
    },

    cart:{
        type:Array,
        default:[]
    }
},
{timestamps:true

})

module.exports = mongoose.model('Users',userSchema)