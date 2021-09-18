const db = require("../models");
const Schedule = db.schedule;
const Visit = db.visit;
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vetsystem',
    password: 'password',
    port: 5432,
})

exports.getSchedule = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT schedules.id, schedules.available, timestamps.day, timestamps.timestamp FROM schedules, timestamps WHERE doctorid = $1 AND schedules.timestampid = timestamps.id', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
exports.addVisit = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query(
        'UPDATE schedules SET available = false WHERE id = $1', [id],
        (error, results) => {
            if (error) {
                throw error
            }
        }
    )

    const animalid = parseInt(request.get('animalid'));
    Visit.create({
        scheduleid: id,
        animalid: animalid
    }).then(response.status(200).json('new visit created'))
};