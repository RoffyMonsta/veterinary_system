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
    });

    return Animal;
};