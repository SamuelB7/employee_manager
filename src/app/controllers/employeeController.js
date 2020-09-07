const Employee = require('../models/employeeModel')
const File = require('../models/fileModel')


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
        try {
            const keys = Object.keys(req.body) 

            for(key of keys) {
                if (req.body[key] =='') {
                    return res.send('Please, fill all fields')
                }
            }

            if (req.files.length == 0) {
                return res.send('Plase, send one image')
            }

            let results = await Employee.create(req.body)
            let employeeId = results.rows[0].id

            const filesPromise = req.files.map(file => File.create({...file,employee_id: employeeId}))
            await Promise.all(filesPromise)

            return res.send('Funcionário cadastrado!')

            //return res.redirect(`/employee/${employeeId}`)
                
        } catch (error) {
            console.error(error);
        }
    },

    async show(req, res) {
        try {
            let results = await Employee.findOne(req.params.id)
            let employee = results.rows[0]

            if(!employee) return res.send('Employee not found')

            return res.render(`/employee/${employee}`)
        } catch (error) {
            console.error(error);
        }
    },

    async edit(req, res) {
        try {
            let results = await Employee.findOne(req.params.id) 
            let employee = results.rows[0]
            
            return res.render(`/employee/${employee}/edit`)
                
        } catch (error) {
            console.error(error)
        }
    },

    async put(req, res) {
        try {
            const keys = Object.keys(req.body) 

            for(key of keys) {
                if (req.body[key] =='') {
                    return res.send('Please, fill all fields')
                }
            }

            await Employee.update(req.body)

            res.redirect(`/employee/${req.body.id}`)

        } catch (error) {
            console.error(error);
        }
    },

    async delete(req, res) {
        try {
            await Employee.delete(req.body.id)

            return res.redirect('/')
        } catch (error) {
            console.error(error);
        }
    }
}