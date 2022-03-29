const Products = require('../models/productModels')
const Users = require('../models/userModels')


const productController = {
    getProducts: async (req,res)=>{
        try {
            const products = await Products.find()
            res.json(products)

        } catch (err) {
            return res.status(500).json({msg:err.message})            
        }
    },
    createProducts: async (req,res)=>{
        try {
            const {product_id,title,images,price,jenis_kelamin,size} = req.body
            if(!images) return res.status(400).json({msg:"no image Upload"})

            const product = await Products.findOne({product_id})
            if(product) return res.status(400).json({msg:"this product already exists"})

            const newProduct = new Products({
                product_id,title:title.toLowerCase(),price,images,jenis_kelamin,size
            })
            await newProduct.save()
            res.json({msg:"create product success"})

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    getDetailProduct: async (req,res) =>{
        try {
            const {id} = req.params
            const product = await Products.findById(id)
            res.json(product)
        } catch (err) {
            return res.status(500).json({msg:err.message})   
        }
    },

    addCart: async (req,res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getDataCart: async (req,res)=>{
        try {
            const user = await Users.findById(req.user.id).select('-password -email -_id -nama_lengkap -no_hp')
            res.json(user)
        } catch (err) {
           return res.status(500).json({msg:err.message})             
            
        }
    }

    
}


module.exports = productController