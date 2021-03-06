const db = require('../../db')
const fs = require('fs')


module.exports = {
    create({filename, path, employee_id}) {
        const query = `
            INSERT INTO photos (
                name,
                path,
                employee_id  
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            filename,
            path,
            employee_id
        ]

        return db.query(query, values) 
    },

    async delete(id) {
        const result = await db.query(`SELECT * FROM photos WHERE id = $1`, [id])
        const photo = result.rows[0]

        fs.unlinkSync(photo.path)

        return db.query(`DELETE FROM photos WHERE id = $1`, [id])
    }
}