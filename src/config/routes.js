module.exports = (app) => {
  app.use('/api/v1/company', require('../routes/company'))
  app.use('/api/v1/widget', require('../routes/widget'))
}
