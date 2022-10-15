module.exports = (sequelize, Sequelize) => {
  const WorkingDay = sequelize.define("workingDays", {
      day: {
          type: Sequelize.STRING
      },
      startTime: {
          type: Sequelize.INTEGER
      },
      endTime: {
        type: Sequelize.INTEGER
      },
      clinicId: {
        type: Sequelize.INTEGER
      },
  });

  return WorkingDay;
};