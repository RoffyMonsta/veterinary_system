module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define("animals", {
        name: {
            type: Sequelize.STRING
        },

        imgurl: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        vaccinated: {
            type: Sequelize.BOOLEAN
        },
        passport: {
            type: Sequelize.BOOLEAN
        },
        kind: {
            type: Sequelize.STRING
        },
        breed: {
            type: Sequelize.STRING
        },
    });

    return Animal;
};
