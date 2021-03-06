module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define("doctors", {
        fullname: {
            type: Sequelize.STRING
        },
        imgurl: {
            type: Sequelize.STRING
        },
        specialization: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });

    return Doctor;
};