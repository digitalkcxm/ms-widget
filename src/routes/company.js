const express = require('express')
const CompanyController = require('../controllers/CompanyController')

const router = express.Router()
const companyController = new CompanyController()

router.get('/', (req, res) => companyController.getAllCompany(req, res))
router.get('/:id', (req, res) => companyController.getCompanyById(req, res))
router.put('/', (req, res) => companyController.alterConpany(req, res))
router.post('/', (req, res) => companyController.createConpany(req, res))

module.exports = router
