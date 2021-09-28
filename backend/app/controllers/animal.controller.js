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
exports.getAnimalById = (request, response) => {
    const id = parseInt(request.params.id)
    const userId = parseInt(request.get('userid'));
    pool.query('SELECT * FROM animals WHERE userid = $1 AND id = $2', [userId, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
exports.deleteAnimal = (request, response) => {
    const id = parseInt(request.params.id);
    const userId = parseInt(request.get('userid'));
    pool.query('DELETE FROM animals WHERE userid = $1 AND id = $2', [userId, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json('Animal removed')
    })
};
exports.addAnimal = (request, response) => {
    const userId = parseInt(request.get('userid'));

    Animal.create({
        name: request.body.name,
        imgurl: request.body.imgurl,
        age: request.body.age,
        userid: userId,
        vaccinated: request.body.vaccinated,
        passport: request.body.passport,
        kind: request.body.kind,
        breed: request.body.breed

    }).then((animal)=>{
        response.status(200).send(animal);
    });
};


