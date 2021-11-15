module.exports = (sequelize, Sequelize) => {
    const Clinic = sequelize.define("clinics", {
        name: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.DOUBLE
        },
        latitude: {
            type: Sequelize.DOUBLE
        },
        address: {
            type: Sequelize.STRING
        },
        pic: {
            type: Sequelize.STRING
        },
        onlyVaccinated: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        onlyPassport: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
    });

    return Clinic;
};