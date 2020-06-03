const database = require('../config/database/database')

class WidgetModel {
  async getAll(id_company) {
    try {
      return await database('widget').select(['name', 'theme', 'token', 'active', 'created_at', 'updated_at']).where({ id_company })
    } catch (err) {
      return err
    }
  }

  async getById(token) {
    try {
      return await database('widget').select(['name', 'theme', 'token', 'active', 'created_at', 'updated_at']).where({ token })
    } catch (err) {
      return err
    }
  }

  async update(id_company, token, obj) {
    try {
      return await database('widget').returning(['name', 'theme', 'token', 'active', 'created_at', 'updated_at']).update(obj).where({ token, id_company })
    } catch (err) {
      return err
    }
  }

  async createWidget(obj) {
    try {
      return await database('widget').returning(['name', 'theme', 'token', 'active', 'created_at', 'updated_at']).insert(obj)
    } catch (err) {
      return err
    }
  }
}

module.exports = WidgetModel
