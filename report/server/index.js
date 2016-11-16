'use strict'

const express = require('express')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 8000

const server = express.createServer()

const layout = fs.readFileSync('client/index.html', 'utf8')

server.use('/js', express.static(
  path.resolve(__dirname, 'client/js')
))

server.use('/css', express.static(
  path.resolve(__dirname, 'client/css')
))

server.use('/images', express.static(
  path.resolve(__dirname, 'client/images')
))

server.get('/', (request, response) => {
  response.send(layout)
})

server.listen(port, error => {
  if (error) throw error
  console.log('Server is running at localhost:5000')
})
