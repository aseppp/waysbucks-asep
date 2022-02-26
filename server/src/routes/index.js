// Import Express
const express = require('express');

// Middleware
const { auth } = require('../middlewares/auth');

// Import express router
const router = express.Router()

// Get auth
const {register, login, checkAuth} = require('../controllers/auth')

// import middleware here
const { uploadFile } = require('../middlewares/uploadFile');

// Import product
const { addProduct, getProducts, detailProduct, editProduct, deleteProduct } = require('../controllers/product');

// Get all controllers from user
const {addUser, getUser, updateUser, deleteUser, userProfile} = require('../controllers/user')

// Routing User
router.post('/addUser', addUser)
router.get('/getUser', getUser)
router.get('/user/:id', auth, userProfile)
router.post('/updateUser/:id', updateUser)
router.post('/delete/:id', deleteUser)

// Routing Product
router.post('/addProduct',auth, uploadFile("image"), addProduct)
router.post('/getProduct', getProducts)
router.get('/detail/:id', detailProduct)
router.post('/edit/:id', editProduct)
router.post('/deleteProduct/:id', deleteProduct)

// import topping
const {addTopping, getToppings, detailTopping, deleteTopping, editTopping} = require('../controllers/topping')

// Routing topping
router.post('/addTopping',auth, uploadFile("image"), addTopping)
router.get('/getTopping', getToppings)
router.get('/detailTopping/:id', detailTopping)
router.post('/deleteTopping/:id', deleteTopping)
router.post('/editTopping/:id',auth, editTopping)

// Routing user action
router.post('/register', register)
router.post('/login', login)

router.post('/check-auth',auth, checkAuth)


module.exports = router;