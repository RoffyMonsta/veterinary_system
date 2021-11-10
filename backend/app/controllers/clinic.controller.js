const db = require("../models");
const Clinic = db.clinic;
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vetsystem',
    password: 'password',
    port: 5432,
})

exports.getAllClinics = (request, response) => {
    pool.query('SELECT * FROM clinics', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};