const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.animal = require("../models/animal.model.js")(sequelize, Sequelize);
db.doctor = require("../models/doctor.model.js")(sequelize, Sequelize);
db.timestamp = require("../models/timestamp.model.js")(sequelize, Sequelize);
db.schedule = require("../models/schedule.model.js")(sequelize, Sequelize);
db.visit = require("../models/visit.model.js")(sequelize, Sequelize);
db.clinic = require("../models/clinic.model.js")(sequelize, Sequelize);
db.workingDay = require("../models/workingDay.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
//Many-to-one
db.user.hasMany(db.animal, {
    foreignKey: 'userid'
});
//Doctor
// db.doctor.hasMany(db.doctor, {
//     foreignKey: 'clinicId'
// });
db.ROLES = ["user", "admin", "doctor"];

module.exports = db;