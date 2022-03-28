const router = require('express').Router()

const userController = require('../controllers/userController')


//user controller
router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/refresh_token",userController.refrehToken)






module.exports = router

