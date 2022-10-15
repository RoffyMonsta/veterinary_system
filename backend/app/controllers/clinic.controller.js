const db = require("../models");
const Clinic = db.clinic;
const WorkingDay = db.workingDay;
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vetsystem',
    password: 'password',
    port: 5432,
})

async function getAllClinics(request, response) {
    const clinics = await Clinic.findAll();
    const clinicsValue = clinics.map(clinics => {
        return clinics.dataValues
    });
    const res = Promise.all(clinicsValue.map( async clinic => {
        const days = await WorkingDay.findAll({
            where: {
              clinicId: clinic.id,
            }
          });
          const daysValue = days.map (days => {
            return days.dataValues
            });
          clinic.workingDays = daysValue;
          return clinic
    })).then( clinics => {
        response.status(200).json(clinics)
    });
    
};

module.exports = {
    getAllClinics
};