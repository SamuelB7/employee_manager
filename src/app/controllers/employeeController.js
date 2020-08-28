const Employee = require('../models/employeeModel')
const { create } = require('../models/employeeModel')

module.exports = {
    async create(req, res) {
        /* await Employee.sectorOptions(function(options){
            return res.render('create', {sectorsOptions: options})
        }) */

        try {
            await Employee.options(function(options1, options2){
                return res.render('create', {sectorsOptions: options1}/* , {positionsOptions: options2} */)
            })
        } catch (error) {
            console.error(error);
        }
    } 
}