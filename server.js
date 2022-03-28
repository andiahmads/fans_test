require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileupload({
    useTempFiles:true
}))


// const URI = process.env.MONGODB_URL
mongoose.connect('mongodb://root:rootpassword@localhost:27017/fans_test',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    authSource: "admin",
    user: "root",
    pass: "rootpassword", 
    
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')

})


//define router



app.get('/',(req,res)=>{
    res.json({msg:"testing app"})
})

app.use("/user",require('./routes/userRoutes'))


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('Server is running on port',PORT)
})