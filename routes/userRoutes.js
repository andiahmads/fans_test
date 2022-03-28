const router = require('express').Router()

const userController = require('../controllers/userController')

const auth = require('../middleware/auth')


//user controller
router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/refresh_token",userController.refrehToken)
router.get('/info',auth,userController.getUser)







module.exports = router

