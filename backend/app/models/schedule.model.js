module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedule", {
        available: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defailtValue: true
        }
  });

  return Schedule;
};
