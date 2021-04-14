const db = require("../models");
const Animal = db.animal;
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vetsystem',
    password: 'password',
    port: 5432,
})

exports.getAnimals = (request, response) => {
    const userId = parseInt(request.get('userid'));
    pool.query('SELECT * FROM animals WHERE userid = $1', [userId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
exports.addAnimal = (req, res) => {
    const userId = parseInt(req.get('userid'));
    
    Animal.create({
            name: req.body.name,
            imgurl: req.body.imgurl,
            age: req.body.age,
            userid: userId
        }).then(res.status(200).json('new animal added'))
};