const moment = require('moment')
const hash = require('object-hash')

const WidgetModel = require('../models/WidgetModel')

const widgetModel = new WidgetModel()

class WidgetController {
  async getAll(req, res) {
    try {
      let widgets = await widgetModel.getAll(req.company.id)

      if (widgets.length <= 0)
        return res.status(200).send([])

      widgets = widgets.map(widgets => {
        widgets.created_at = moment(widgets.created_at).format('DD/MM/YYYY HH:mm')
        widgets.updated_at = moment(widgets.updated_at).format('DD/MM/YYYY HH:mm')

        return widgets
      })

      return res.status(200).send(widgets)
    } catch (err) {
      return res.status(500).send({ error: 'Ocorreu algum erro ao tentar recuperar Widgets' })
    }
  }

  async getById(req, res) {
    try {
      let widgets = await widgetModel.getById(req.params.token)

      if (widgets.length <= 0)
        return res.status(200).send([])

      widgets = widgets.map(widgets => {
        widgets.created_at = moment(widgets.created_at).format('DD/MM/YYYY HH:mm')
        widgets.updated_at = moment(widgets.updated_at).format('DD/MM/YYYY HH:mm')

        return widgets
      })

      return res.status(200).send(widgets[0])
    } catch (err) {
      return res.status(500).send({ error: 'Ocorreu algum erro ao tentar recuperar Widget' })
    }
  }

  async update(req, res) {
    const obj = {}
    const date = moment().format()

    try {
      req.assert('token', 'O campo name é obrigatório').notEmpty()

      if (req.validationErrors())
        return res.status(400).send({ errors: req.validationErrors() })

      obj.updated_at = date
      req.body.name ? obj.name = req.body.name : ''
      req.body.theme ? obj.theme = req.body.theme : ''
      typeof req.body.active == 'boolean' ? obj.active = req.body.active : ''

      let widget = await widgetModel.update(req.company.id, req.body.token, obj)

      if (widget.name == 'error' && widget.code == '23505')
        return res.status(400).send({ error: 'Já existe um widget com este nome cadastrado' })

      widget = widget.map(widget => {
        widget.created_at = moment(widget.created_at).format('DD/MM/YYYY HH:mm')
        widget.updated_at = moment(widget.updated_at).format('DD/MM/YYYY HH:mm')

        return widget
      })

      return res.status(200).send(widget[0])
    } catch (err) {
      return res.status(500).send({ error: 'Ocorreu algum erro ao tentar realizar update no Widget.' })
    }
  }

  async create(req, res) {
    const date = moment().format()

    try {
      req.assert('name', 'O campo name é obrigatório').notEmpty()
      req.assert('theme', 'O campo callback é obrigatório').notEmpty()

      if (req.validationErrors())
        return res.status(400).send({ errors: req.validationErrors() })

      const token = hash({ foo: `${req.body.name}-${date}` })

      let widget = await widgetModel.createWidget({
        id_company: req.company.id,
        name: req.body.name,
        theme: req.body.theme,
        token,
        created_at: date,
        updated_at: date
      })

      if (widget.name == 'error' && widget.code == '23505')
        return res.status(400).send({ error: 'Já existe um widget com este nome cadastrado' })

      widget = widget.map(widget => {
        widget.created_at = moment(widget.created_at).format('DD/MM/YYYY HH:mm')
        widget.updated_at = moment(widget.updated_at).format('DD/MM/YYYY HH:mm')

        return widget
      })

      return res.status(201).send(widget[0])
    } catch (err) {
      return res.status(500).send({ error: 'Ocorreu algum erro ao tentar criar Widget' })
    }
  }
}

module.exports = WidgetController
