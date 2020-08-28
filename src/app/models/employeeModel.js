const db = require('../../db')
const { create } = require('../controllers/employeeController')

module.exports = {
    async create(data, callback) {
        try {
            const query = `
            INSERT INTO employee (
                name,
                email,
                tel,
                birth,
                cpf,
                address,
                sector_id,
                position_id  
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
            `

            const values = [
                data.name,
                data.email,
                data.tel,
                data.birth,
                data.cpf,
                data.address,
                data.sector_id,
                data.position
            ]

            await db.query(query, values, function(results){
                callback(results.rows[0])
            })
        } catch (error) {
            console.error(error);
        }
    },

    async findAll(callback) {
        try {
            await db.query(`SELECT * FROM employee`, function(results){
                callback(results.rows)
            })
        } catch (error) {
            console.error(error);
        }
    },

    async findOne(id, callback) {
        await db.query(`SELECT * FROM employee WHERE id = $1`, [id], function(results){
            callback(results.rows[0])
        })
    },

    async update(data, callback) {
        try {
            const query = `
            UPDATE employee SET
                name=($1),
                email=($2),
                tel=($3),
                birth=($4),
                cpf=($5),
                address=($6),
                sector_id=($7),
                position_id=($8)
            WHERE id = $10
            `

            const values = [
                data.name,
                data.email,
                data.tel,
                data.birth,
                data.cpf,
                data.address,
                data.sector_id,
                data.position,
                data.id
            ]

            await db.query(query, values, function(results){
                callback()
            })
        } catch (error) {
            console.error(error);
        }
    },

    async delete(id, callback) {
        try {
            await db.query(`DELETE FROM employee WHERE id = $1`, [id], function(results){
                return callback()
            })
        } catch (error) {
            console.error(error);
        }
    },

    /* async sectorOptions(callback) {
        await db.query(`SELECT name, id FROM sector;`, function(err, results){
            callback(results.rows)
            console.log(results.rows)
        })
    },

    async positionOptions(callback) {
        await db.query(`SELECT name, id FROM position`, function(err, results){

            callback(results.rows)
            console.log(results.rows)
        })
    } */

    async options (callback1, callback2) {
        try {
            await db.query(`SELECT name, id FROM sector;`, function(err, results){
                callback1(results.rows)
                console.log(results.rows)
            })
    
            /* await db.query(`SELECT name, id FROM position`, function(err, results){
                callback2(results.rows)
                console.log(results.rows)
            }) */
        } catch (error) {
            console.error(error);
        }
    }
}