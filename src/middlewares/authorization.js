const CompanyModel = require('../models/CompanyModel')

const companyModel = new CompanyModel()

async function tokenVerify(req, res, next) {
  const token = req.headers.authorization

  if(!token)
    return res.status(400).send({ error: 'Você não tem autorização para realizar essa ação.' })

  try {
    const company = await companyModel.getByTokenCompany(token)

    if(company.length <= 0)
      return res.status(400).send({ error: 'Você não tem autorização para realizar essa ação.' })

    req.company = company[0]

    return next()
  } catch (err) {
    return res.status(500).send({ error: 'Ocorreu algum erro em authorization' })
  }
}


module.exports = { tokenVerify }
