const Employee = require('../models/employeeModel')


module.exports = {
    async create(req, res) {
        try {
            await Employee.sectorOptions(function(options1){
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

        await Employee.create(req.body, function(employee){
            return res.send('Funcionário cadastrado')
        })
    },

    async show(req, res) {
        await Employee.findOne(req.params.id, function(employee){
            if(!employee) return res.send('Employee not found')

            return res.render('show', {employee})
        })
    },

    async edit(req, res) {
        await Employee.findOne(req.params.id, function(employee){
            if(!employee) return res.send('Employee not found')

            return res.render('edit', {employee})
        })
    },

    async put(req, res) {
        const keys = Object.keys(req.body) 

        for(key of keys) {
            if (req.body[key] =='') {
                return res.send('Please, fill all fields')
            }
        }

        await Employee.update(req.body, function(){
            res.redirect(`/employee/${req.body.id}`)
        })
    },

    async delete(req, res) {
        await Employee.delete(req.body.id, function(){
            return res.redirect('/')
        })
    }
}