const db = require("../models");
const Visit = db.visit;
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vetsystem',
    password: 'password',
    port: 5432,
})

exports.getAllVisits = (request, response) => {
    const userId = parseInt(request.get('userid'));
    pool.query('SELECT animals.name, doctors.fullname, timestamps.day, timestamps.timestamp FROM visits, animals, doctors, schedules, timestamps, users WHERE users.id = animals.userid AND animals.id = visits.animalid AND visits.scheduleid = schedules.id AND schedules.timestampid = timestamps.id AND schedules.doctorid = doctors.id AND users.id = $1', [userId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};