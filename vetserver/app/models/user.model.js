module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM('Pending', 'Active'),
            defaultValue: 'Pending'
        },
        confirmationCode: {
            type: Sequelize.STRING,
            unique: true
        },
        fullname: {
            type: Sequelize.STRING,
            defaultValue: 'No name provided'
        },
        imgurl: {
            type: Sequelize.STRING,
            defaultValue: '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
        }
    });

    return User;
};