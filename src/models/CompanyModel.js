const database = require('../config/database/database')

class CompanyModel {
  async createCompany(obj) {
    try {
      return await database('company').returning(['id', 'name', 'callback', 'token', 'active', 'created_at', 'updated_at']).insert(obj)
    } catch (err) {
      return err
    }
  }

  async updateCompany(id, obj) {
    try {
      return await database('company').returning(['id', 'name', 'callback', 'token', 'active', 'created_at', 'updated_at']).update(obj).where({ id })
    } catch (err) {
      return err
    }
  }

  async getAllCompany() {
    try {
      return await database('company').select('id', 'name', 'callback', 'token', 'active', 'created_at', 'updated_at')
    } catch (err) {
      return err
    }
  }

  async getByIdCompany(id) {
    try {
      return await database('company').select('id', 'name', 'callback', 'token', 'active', 'created_at', 'updated_at').where({ id })
    } catch (err) {
      return err
    }
  }
}

module.exports = CompanyModel
