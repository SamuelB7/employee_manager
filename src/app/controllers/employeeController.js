const Employee = require('../models/employeeModel')


module.exports = {
    async create(req, res) {
        try {
            Employee.sectorOptions(function(options1){
                Employee.positionOptions(function(options2){
                    res.render('create', {sectorsOptions:options1, positionsOptions:options2})
                })
            })
        } catch (error) {
            console.error(error);
        }
    } 
}