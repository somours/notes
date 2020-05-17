const express = require('express')
const bodyParser = require('body-parser')
const cookidParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: true}))
app.use(cookidParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}


app.use(router)

const port = 8088
module.exports = app.listen(port)
