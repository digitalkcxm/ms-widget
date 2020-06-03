const moment = require('moment')
const hash = require('object-hash')
const CompanyModel = require('../models/CompanyModel')

const companyModel = new CompanyModel()

class CompanyController {
  async createConpany(req, res) {
    const date = moment().format()

    req.assert('name', 'O campo name é obrigatório').notEmpty()
    req.assert('callback', 'O campo callback é obrigatório').notEmpty()

    if (req.validationErrors())
      return res.status(400).send({ errors: req.validationErrors() })

    const token = hash({ foo: `${req.body.name}-${date}` })

    try {
      let company = await companyModel.createCompany({
        name: req.body.name,
        callback: req.body.callback,
        token,
        created_at: date,
        updated_at: date
      })

      if(company.name == 'error' && company.code == '23505')
        return res.status(400).send({ error: 'Já existe uma company com este nome cadastrada' })

      company = company.map(company => {
        company.created_at = moment(company.created_at).format('DD/MM/YYYY HH:mm')
        company.updated_at = moment(company.updated_at).format('DD/MM/YYYY HH:mm')

        return company
      })

      return res.status(201).send(company[0])
    } catch (err) {
      return res.status(500).send({ error: 'Ocorreu um erro ao tentar criar a company.' })
    }
  }

  async alterConpany(req, res) {
    const obj = {}
    const date = moment().format()

    req.assert('id', 'O campo name é obrigatório').notEmpty()

    if (req.validationErrors())
      return res.status(400).send({ errors: req.validationErrors() })


    try {
      obj.updated_at = date
      req.body.name ? obj.name = req.body.name : ''
      req.body.callback ? obj.callback = req.body.callback : ''
      typeof req.body.active == 'boolean' ? obj.active = req.body.active : ''

      let company = await companyModel.updateCompany(req.body.id, obj)

      if(company.name == 'error' && company.code == '23505')
        return res.status(400).send({ error: 'Já existe uma company com este nome cadastrada' })

      company = company.map(company => {
        company.created_at = moment(company.created_at).format('DD/MM/YYYY HH:mm')
        company.updated_at = moment(company.updated_at).format('DD/MM/YYYY HH:mm')

        return company
      })

      return res.status(200).send(company[0])
    } catch (err) {
      console.log("CompanyController -> alterConpany -> err", err)
      return res.status(500).send({ error: 'Ocorreu um erro ao tentar atualizar a company.' })
    }
  }

  async getAllCompany(req, res) {
    try {
      let companys = await companyModel.getAllCompany()

      companys = companys.map(company => {
        company.created_at = moment(company.created_at).format('DD/MM/YYYY HH:mm')
        company.updated_at = moment(company.updated_at).format('DD/MM/YYYY HH:mm')

        return company
      })

      return res.status(200).send(companys)
    } catch (err) {
      return res.status(500).send({ error: 'Ocorreu algum erro ao tentar recuperar as companys' })
    }
  }

  async getCompanyById(req, res) {
    try {
      let companys = await companyModel.getByIdCompany(req.params.id)

      if(companys.length <= 0)
        return res.status(200).send([])

      companys = companys.map(company => {
        company.created_at = moment(company.created_at).format('DD/MM/YYYY HH:mm')
        company.updated_at = moment(company.updated_at).format('DD/MM/YYYY HH:mm')

        return company
      })

      return res.status(200).send(companys[0])
    } catch (err) {
      return res.status(500).send({ error: 'Ocorreu algum erro ao tentar recuperar a company' })
    }
  }
}

module.exports = CompanyController
