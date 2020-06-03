const express = require('express')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('./cors')

const app = express()

cors(app)
app.use(bodyParser.json({ limit: '250mb' }))
app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }))
app.use(expressValidator())
app.use((req, res, next) => next())

routes(app)

app.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`))

module.exports = app
