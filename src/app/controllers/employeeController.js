const Employee = require('../models/employeeModel')
const File = require('../models/fileModel')
const {date} = require('../../../utils')


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

            return res.redirect(`/employee/${employeeId}`)
                
        } catch (error) {
            console.error(error);
        }
    },

    async show(req, res) {
        try {
            let results = await Employee.findOne(req.params.id)
            let employee = results.rows[0]

            if(!employee) return res.send('Employee not found')

            employee.birth = date(employee.birth).format

            results = await Employee.findPhotos(req.params.id)
            let photo = results.rows[0]
            photoSrc = `${req.protocol}://${req.headers.host}${photo.path.replace("public", "")}`

            return res.render(`show`, {employee, photo, photoSrc})
        } catch (error) {
            console.error(error);
        }
    },

    async edit(req, res) {
        try {
            let results = await Employee.findOne(req.params.id) 
            let employee = results.rows[0]

            employee.birth = date(employee.birth).iso

            results = await Employee.findPhotos(req.params.id)
            let photo = results.rows[0]
            photoSrc = `${req.protocol}://${req.headers.host}${photo.path.replace("public", "")}`

            await Employee.sectorOptions(function(options1){
                Employee.positionOptions(function(options2){
                    res.render('edit', {employee, photo, photoSrc, sectorsOptions:options1, positionsOptions:options2})
                })
            })
                
        } catch (error) {
            console.error(error)
        }
    },

    async put(req, res) {
        try {
            const keys = Object.keys(req.body) 

            for(key of keys) {
                if (req.body[key] =="" && key != "removed_photo") {
                    return res.send('Please, fill all fields')
                }
            }

            const newFilesPromise = req.files.map(file => File.create({...file,employee_id: req.body.id}))
            await Promise.all(newFilesPromise)

            const removedPhoto = req.body.removed_photo
            await File.delete(removedPhoto)

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
    },

    async index(req, res) {
        try {
            const {filter} = req.query

            if(filter) {
                let results = await Employee.findBy(filter)
                employees = results.rows
                
                return res.render('index', {employees})
            } else {
                let results = await Employee.findAll()
                employees = results.rows
                return res.render('index', {employees})
            }
        } catch (error) {
            console.error(error);
        }
    }
}