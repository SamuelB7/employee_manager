const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const employee = require('./app/controllers/employeeController')


routes.get('/', function(req, res){
    res.render('index')
})

routes.get('/create', employee.create)
routes.get('/employee/:id', employee.show) 
routes.get('/employee/:id/edit', employee.edit)

routes.post('/employee', multer.array("photos", 1), employee.post)
routes.put('/employee', multer.array("photos", 1),employee.put) 
routes.delete('/employee', employee.delete)

module.exports = routes
