const db = require("../models");
const Doctor = db.doctor;
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vetsystem',
    password: 'password',
    port: 5432,
})

exports.getDoctors = (request, response) => {
    pool.query('SELECT * FROM doctors', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
exports.getDoctorById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM doctors WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};