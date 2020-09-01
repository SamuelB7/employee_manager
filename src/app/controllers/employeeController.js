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
    },

    async post(req, res){
        const keys = Object.keys(req.body) 

        for(key of keys) {
            if (req.body[key] =='') {
                return res.send('Please, fill all fields')
            }
        }

        Employee.create(req.body, function(employee){
            return res.send('Funcionário cadastrado')
        })
    }
}