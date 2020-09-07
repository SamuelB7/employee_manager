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
    }
}