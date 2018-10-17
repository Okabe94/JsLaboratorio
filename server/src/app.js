const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const mongoose = require('mongoose')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

mongoose.connect('mongodb://localhost:27017/Laboratorio', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  app.listen(config.port)
  console.log('Servidor funcionando en puerto: ', config.port)
})
