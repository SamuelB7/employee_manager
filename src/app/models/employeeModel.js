const db = require('../../db')
const fs = require('fs')


module.exports = {
    create(data) {
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
                data.sector,
                data.position
            ]

            return db.query(query, values)

        } catch (error) {
            console.error(error);
        }
    },

    findAll() {
        try {
            return db.query(`SELECT * FROM employee ORDER BY id`)
        } catch (error) {
            console.error(error);
        }
    },

    findOne(id) {
        try {
            return db.query(`SELECT * FROM employee WHERE id = $1`, [id])
        } catch (error) {
            console.error(error);
        }
    },

    update(data) {
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
            WHERE id = $9
            `

            const values = [
                data.name,
                data.email,
                data.tel,
                data.birth,
                data.cpf,
                data.address,
                data.sector,
                data.position,
                data.id
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error);
        }
    },

    async delete(id) {
        try {

            const result = await db.query(`SELECT * FROM photos WHERE employee_id = $1`, [id])
            const photo = result.rows[0]

            fs.unlinkSync(photo.path)

            return db.query(`DELETE FROM employee WHERE id = $1`, [id])
        } catch (error) {
            console.error(error);
        }
    },

    sectorOptions(callback) {
        db.query(`SELECT name, id FROM sector;`, function(err, results){
            callback(results.rows)
        })
    },

    positionOptions(callback) {
        db.query(`SELECT name, id FROM position`, function(err, results){
            callback(results.rows)
        })
    },

    findPhotos(id) {
        return db.query(`
            SELECT * FROM photos WHERE employee_id = $1
        `, [id])
    }
}