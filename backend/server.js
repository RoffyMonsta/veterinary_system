const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8100"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const { clinic } = require("./app/models");
const { initMockData } = require("./app/config/init-mock-data");
const Role = db.role;
const User = db.user;
const Doctor = db.doctor;
const Animal = db.animal;
const Timestamp = db.timestamp;
const Schedule = db.schedule;
const Clinic = db.clinic;
db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Database with { force: true }');
//     initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/animal.routes')(app);
require('./app/routes/doctor.routes')(app);
require('./app/routes/schedule.routes')(app);
require('./app/routes/visit.routes')(app);
require('./app/routes/clinic.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "doctor"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
    initMockData();
}
