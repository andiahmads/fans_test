const router = require('express').Router()

const productController = require('../controllers/productController')

const auth = require('../middleware/auth')


router.route('/products')
    .get(auth,productController.getProducts)
    .post(productController.createProducts)




router.route('/products/:id')
    .get(productController.getDetailProduct)


router.route('/products/addcart')
    .patch(auth,productController.addCart)

router.get('/showcart',auth,productController.getDataCart)



module.exports = router