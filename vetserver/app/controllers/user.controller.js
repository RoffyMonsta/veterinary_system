const db = require("../models");
const User = db.user;
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vetsystem',
    password: 'password',
    port: 5432,
})
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.doctorBoard = (req, res) => {
    res.status(200).send("Doctor Content.");
};
exports.updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { fullname, imgurl } = request.body

    pool.query(
        'UPDATE users SET fullname = $1, imgurl = $2 WHERE id = $3', [fullname, imgurl, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json("User modified");
        }
    )
};
exports.getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};