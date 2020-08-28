const express = require('express')
const routes = express.Router()
const employee = require('./app/controllers/employeeController')


routes.get('/', function(req, res){
    res.render('index')
})

routes.get('/create', employee.create)

module.exports = routes
