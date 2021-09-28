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
const Role = db.role;
const User = db.user;
const Doctor = db.doctor;
const Animal = db.animal;
const Timestamp = db.timestamp;
const Schedule = db.schedule;
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
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function CreateTimestamp() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '14:00-15:00', '16:00-17:00', '17:00-18:00', '18:00-19:00'];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 8; j++) {
            Timestamp.create({
                day: days[i],
                timestamp: hours[j]
            })
        }
    };
};

function CreateSchedule() {
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 41; j++) {
            Schedule.create({
                doctorid: i,
                timestampid: j,

                available: true
            })
        }
    }
}

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
    Doctor.create({
        fullname: "Losovetska Anastasia",
        imgurl: "https://www.indiaeducation.net/imagesvr_ce/8982/iStock_000009819502Small.jpg",
        specialization: "Home pets",
        description: "I've graduated from Lviv National Veterinary University of Veterinary Medicine and Biotechnology. Gzycki in 2014. I have been working for this company since 2015."
    });
    Doctor.create({
        fullname: "Ivanov Ivan",
        imgurl: "https://5.imimg.com/data5/BX/KU/ML/SELLER-6134433/veterinary-doctor-500x500.jpg",
        specialization: "Home pets",
        description: "I've graduated from Lviv National Veterinary University of Veterinary Medicine and Biotechnology. Gzycki in 2013. I've been working for this company since 2016."
    });
    Doctor.create({
        fullname: "Andrusiak Valeria",
        imgurl: "https://uploads.sarvgyan.com/2016/03/Veterinary.jpg",
        specialization: "Exotic pets",
        description: "I've graduated from Kamyanets-Podilsky Agrarian University with a degree in Exotic Animals in 2012. Since 2013 I've been working in this clinic."
    });
    Doctor.create({
        fullname: "Demidov Denys",
        imgurl: "https://www.colourbox.com/preview/6980687-veterinarian-doctor-with-jack-russell.jpg",
        specialization: "Home pets",
        description: "I've graduated from Lviv National University with a degree in Veterinary Medicine in 2011. I've been working for this company since 2015."
    });
    CreateTimestamp();
    CreateSchedule();
}
