const Router = require('express')
const brandControllers = require('../controllers/brandController')
const router = new Router()


router.post('/',brandControllers.create)
router.get('/getAll',brandControllers.getAll)
router.post('/getOne',brandControllers.getOne)


module.exports = router