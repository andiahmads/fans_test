const Users = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req,res) =>{
        try {
            const {nama_lengkap,email,password,no_hp} = req.body

            //cek if email already exist
            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg:"email already exists."})
            if (password.length < 6) return res.status(400).json({msg:"password is at least 6 character long."})


            //encrypt password
            const passwordHash = await bcrypt.hash(password,10)
            const newUser =  Users({
                nama_lengkap,email,password:passwordHash,no_hp
            })
            //save to mongoodb
            await newUser.save()

            //create access token
            const accesstoken = createAccessToken({id:newUser._id})
            const refreshtoken = createRefreshToken({id:newUser._id})

            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })

            // res.json({accesstoken})
            res.json({msg:"register success."})

        } catch (err) {
           return res.status(500).json({msg:err.message}) 
        }
    },
    login:async (req,res) =>{
        try {
            const  {email,password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg:"user does not exists."})

            //compare password using bcrypt
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:"Incorret password."})

            //login success
            const accesstoken = createAccessToken({id:user._id})
            const refreshtoken = createRefreshToken({id:user._id})
            
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })            
            res.json({accesstoken})

        } catch (err) {
           return res.status(500).json({msg:err.message})             
        }
        
    },
    refrehToken: async (req,res)=>{
        try {
            const rf_token =  req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg:'Please Login or Register.'})
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(400).json({msg:'Please Login or Register.'})
            
                const accesstoken = createAccessToken({id:user.id})
                res.json({accesstoken})
            })
            
        } catch (err) {
           return res.status(500).json({msg:err.message}) 
            
        }
    },
    // getUser: async (req,res)=>{
    //     try {
    //         const user = await Users.findById(req.user.id).select('-password')
    //         res.json(user)
    //     } catch (err) {
    //        return res.status(500).json({msg:err.message})                                                                                               
            
    //     }
    // }
}

const createAccessToken = (user) =>{
    return jwt.sign(user,process.env.ACCCESS_TOKEN_SECRET,{expiresIn:'1d'})
}

const createRefreshToken = (user) =>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
}



module.exports = userController