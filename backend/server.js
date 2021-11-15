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


function CreateClinics() {
    Clinic.create({
        name: 'Пан Коцький',
        latitude: 48.26897007357895,
        longitude: 25.940208543938567,
        pic: 'https://pankotskyj.com/images/main_photos/all.jpg',
        onlyVaccinated: true,
        onlyPassport: false,
        address: 'вулиця Небесної сотні, 15, Чернівці, Чернівецька область, 58000'
    });
    Clinic.create({
        name: 'Панда',
        latitude: 48.27422343359462,
        longitude: 25.96092041189593,
        pic: 'https://s3.eu-central-1.amazonaws.com/listmusor/production/111664/gallery/big/5b9add994e950.jpg?1316609607',
        onlyVaccinated: true,
        onlyPassport: true,
        address: 'вулиця Шкільна, 5, Чернівці, Чернівецька область, 58000'
    });
    Clinic.create({
        name: 'Доктор Вет',
        latitude: 48.28133631639818, 
        longitude: 25.97935332449835,
        pic: 'https://s3.eu-central-1.amazonaws.com/listmusor/production/178019/logo/big/5d6518ec59a00.png',
        onlyVaccinated: false,
        onlyPassport: true,
        address: 'вулиця Руська, 219 є, Чернівці, Чернівецька область, 58023'
    });
    Clinic.create({
        name: 'Доктор Айболіт',
        latitude: 48.26443817235608, 
        longitude: 25.946646676686854,
        pic: 'https://cdn1.pokupon.ua/uploaded/merchant_page_images/45708/data/large1200/image2.JPG?1516229841',
        onlyVaccinated: true,
        onlyPassport: true,
        address: 'вулиця Полєтаєва, 11, Чернівці, Чернівецька область, 58000'
    });
    Clinic.create({
        name: 'Ніка',
        latitude: 48.287167093674014, 
        longitude: 25.960989135381595,
        pic: 'https://911.kh.ua/wp-content/themes/vetclinic/html/public/images/icons/logo_mini.svg',
        onlyVaccinated: false,
        onlyPassport: false,
        address: 'вулиця Руська, 129, Чернівці, Чернівецька область, 58000'
    });
    Clinic.create({
        name: 'Дільнична лікарня ветеринарної медицини №1 м. Чернівці',
        latitude: 48.29525744372958, 
        longitude: 25.94372556380633,
        pic: 'https://media.acc.cv.ua/news/article/2019/11/30/52213/rtior6TjKLowLhPRCcfp.r575x340.jpg',
        onlyVaccinated: true,
        onlyPassport: true,
        address: 'вулиця Мінська, 5, Чернівці, Чернівецька область, 58000'
    });
    Clinic.create({
        name: 'Ветеринарна клініка на Руській',
        latitude: 48.282365553986786, 
        longitude: 25.97395673540144,
        pic: 'https://media.acc.cv.ua/news/article/2020/02/28/55441/jnDUtWlwQcCMKiIKX3hk.r575x340.jpg',
        onlyVaccinated: true,
        onlyPassport: true,
        address: 'вулиця Руська, 194, Чернівці, Чернівецька область, 58000'
    });
    Clinic.create({
        name: 'Чернівецька міська державна лікарня ветеринарної медицини',
        latitude: 48.266783350529494, 
        longitude: 25.909325519108545,
        pic: 'https://lh3.googleusercontent.com/ig7x0pgEGyOeKdgxhGak98BA2rfIkzFJ2zfMBxX-Fz8MFNjV9mKkNLZFFXqKyG2r3w0gIVn61Ffg3A5Y=w1080-h608-p-no-v0',
        onlyVaccinated: false,
        onlyPassport: false,
        address: 'вулиця Сторожинецька, 115, Чернівці, Чернівецька область, 58000'
    });
    Clinic.create({
        name: 'VetClinic',
        latitude: 48.26245399910462, 
        longitude: 25.938564599645773,
        pic: 'https://s3.eu-central-1.amazonaws.com/listmusor/production/194729/logo/big/5daff7fd18629.png',
        onlyVaccinated: true,
        onlyPassport: false,
        address: 'вулиця Пилипа Орлика, 11, Чернівці, Чернівецька область, 58000'
    });
    Clinic.create({
        name: 'The VetLife Clinic',
        latitude: 48.25202691901743, 
        longitude: 25.933840457741685,
        pic: 'https://s3.eu-central-1.amazonaws.com/listmusor/production/257715/gallery/big/5fdfbe61da210.jpg?1316609607',
        onlyVaccinated: true,
        onlyPassport: true,
        address: 'вулиця Південно-Кільцева, 2а, Чернівці, Чернівецька область, 58013'
    });
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }
function CreateDoctors() {
    const specializations = [
        'Гастроентеролог',
        'Кардіолог',
        'Нефролог',
        'Травматолог-ортопед',
        'Невролог',
        'Дерматолог',
        'Стоматолог'
    ]
    for (let i = 0; i < 100; i++){
        const clinic_id = getRandomInt(1,11);
        const specialization_id = getRandomInt(0,7);
        Doctor.create({
            fullname: "Doctor Name",
            imgurl: "https://www.indiaeducation.net/imagesvr_ce/8982/iStock_000009819502Small.jpg",
            specialization: specializations[specialization_id],
            clinicId: clinic_id
        });
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
    CreateClinics();
    CreateDoctors();
}
