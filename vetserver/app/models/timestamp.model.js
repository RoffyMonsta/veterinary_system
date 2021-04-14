module.exports = (sequelize, Sequelize) => {
    const Timestamp = sequelize.define("timestamp", {
        day: {
            type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')
        },
        timestamp: {
            type: Sequelize.ENUM('9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '14:00-15:00', '16:00-17:00', '17:00-18:00', '18:00-19:00')
        }
    });

    return Timestamp;
};