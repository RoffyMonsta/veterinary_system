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
        imgUrl: {
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
        phoneNumber: {
            type: Sequelize.STRING
        },
    });

    return Clinic;
};