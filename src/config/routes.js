module.exports = (app) => {
  app.use('/api/v1/company', require('../routes/company'))
}
