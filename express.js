'use strict'

const express = require('express')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 5000

const server = express()
const router = express.Router()

const layout = fs.readFileSync('dist/index.html', 'utf8')

server.use(express.static(`${__dirname}/dist`));

server.get('/', (request, response) => {
  response.send(layout)
})

server.get('/api', router)

server.listen(port, error => {
  if (error) throw error
  console.log('Server is running at localhost:5000')
})
