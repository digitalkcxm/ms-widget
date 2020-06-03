const express = require('express')
const authorization = require('../middlewares/authorization')
const WidgetController = require('../controllers/WidgetController')

const router = express.Router()
const widgetController = new WidgetController()

router.get('/:token', (req, res) => widgetController.getById(req, res))

router.use(authorization.tokenVerify)

router.get('/', (req, res) => widgetController.getAll(req, res))
router.put('/', (req, res) => widgetController.update(req, res))
router.post('/', (req, res) => widgetController.create(req, res))

module.exports = router
