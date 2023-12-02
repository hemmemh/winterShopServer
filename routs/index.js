const Router = require('express')
const router = new Router()
const typeRouter  = require('./typeRouter')
const brandRouter  = require('./brandRouter')
const productRouter  = require('./productRouter')
const userRouter  = require('./userRouter')
const basketRouter  = require('./basketRouter')
const lovesRouter  = require('./lovesRouter')

const ratingRouter  = require('./ratingRouter')

router.use('/type',typeRouter)
router.use('/brand',brandRouter)
router.use('/product',productRouter)
router.use('/user',userRouter)
router.use('/basket',basketRouter)
router.use('/loves',lovesRouter)
router.use('/rating',ratingRouter)
module.exports = router 