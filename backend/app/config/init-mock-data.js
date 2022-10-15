const db = require("../models");
const Clinic = db.clinic;
const Doctor = db.doctor;
function initMockData() {
  CreateClinics();
  CreateDoctors();
}

async function CreateClinics() {
  const createCalls = [];
  createCalls.push(Clinic.create({
      name: 'Пан Коцький',
      latitude: 48.26897007357895,
      longitude: 25.940208543938567,
      imgUrl: 'https://pankotskyj.com/images/main_photos/all.jpg',
      onlyVaccinated: true,
      onlyPassport: false,
      address: 'вулиця Небесної сотні, 15, Чернівці, Чернівецька область, 58000',
      phoneNumber: '+380937001234'
    }));
    createCalls.push(Clinic.create({
      name: 'Панда',
      latitude: 48.27422343359462,
      longitude: 25.96092041189593,
      imgUrl: 'https://s3.eu-central-1.amazonaws.com/listmusor/production/111664/gallery/big/5b9add994e950.jpg?1316609607',
      onlyVaccinated: true,
      onlyPassport: true,
      phoneNumber: '+380937001234',
      address: 'вулиця Шкільна, 5, Чернівці, Чернівецька область, 58000'
  }).catch(err => {console.log(err)}
  ));
  createCalls.push(Clinic.create({
      name: 'Доктор Вет',
      latitude: 48.28133631639818, 
      longitude: 25.97935332449835,
      imgUrl: 'https://s3.eu-central-1.amazonaws.com/listmusor/production/178019/logo/big/5d6518ec59a00.png',
      onlyVaccinated: false,
      onlyPassport: true,
      phoneNumber: '+380937001234',
      address: 'вулиця Руська, 219 є, Чернівці, Чернівецька область, 58023'
  }));
  createCalls.push(Clinic.create({
      name: 'Доктор Айболіт',
      latitude: 48.26443817235608, 
      longitude: 25.946646676686854,
      imgUrl: 'https://cdn1.pokupon.ua/uploaded/merchant_page_images/45708/data/large1200/image2.JPG?1516229841',
      onlyVaccinated: true,
      onlyPassport: true,
      phoneNumber: '+380937001234',
      address: 'вулиця Полєтаєва, 11, Чернівці, Чернівецька область, 58000'
  }));
  createCalls.push(Clinic.create({
      name: 'Ніка',
      latitude: 48.287167093674014, 
      longitude: 25.960989135381595,
      imgUrl: 'https://911.kh.ua/wp-content/themes/vetclinic/html/public/images/icons/logo_mini.svg',
      onlyVaccinated: false,
      onlyPassport: false,
      phoneNumber: '+380937001234',
      address: 'вулиця Руська, 129, Чернівці, Чернівецька область, 58000'
  }));
  createCalls.push(Clinic.create({
      name: 'Дільнична лікарня ветеринарної медицини №1 м. Чернівці',
      latitude: 48.29525744372958, 
      longitude: 25.94372556380633,
      imgUrl: 'https://media.acc.cv.ua/news/article/2019/11/30/52213/rtior6TjKLowLhPRCcfp.r575x340.jpg',
      onlyVaccinated: true,
      onlyPassport: true,
      phoneNumber: '+380937001234',
      address: 'вулиця Мінська, 5, Чернівці, Чернівецька область, 58000'
  }));
  createCalls.push(Clinic.create({
      name: 'Ветеринарна клініка на Руській',
      latitude: 48.282365553986786, 
      longitude: 25.97395673540144,
      imgUrl: 'https://media.acc.cv.ua/news/article/2020/02/28/55441/jnDUtWlwQcCMKiIKX3hk.r575x340.jpg',
      onlyVaccinated: true,
      onlyPassport: true,
      phoneNumber: '+380937001234',
      address: 'вулиця Руська, 194, Чернівці, Чернівецька область, 58000'
  }));
  createCalls.push(Clinic.create({
      name: 'Чернівецька міська державна лікарня ветеринарної медицини',
      latitude: 48.266783350529494, 
      longitude: 25.909325519108545,
      imgUrl: 'https://lh3.googleusercontent.com/ig7x0pgEGyOeKdgxhGak98BA2rfIkzFJ2zfMBxX-Fz8MFNjV9mKkNLZFFXqKyG2r3w0gIVn61Ffg3A5Y=w1080-h608-p-no-v0',
      onlyVaccinated: false,
      onlyPassport: false,
      phoneNumber: '+380937001234',
      address: 'вулиця Сторожинецька, 115, Чернівці, Чернівецька область, 58000'
  }));
  createCalls.push(Clinic.create({
      name: 'VetClinic',
      latitude: 48.26245399910462, 
      longitude: 25.938564599645773,
      imgUrl: 'https://s3.eu-central-1.amazonaws.com/listmusor/production/194729/logo/big/5daff7fd18629.png',
      onlyVaccinated: true,
      onlyPassport: false,
      phoneNumber: '+380937001234',
      address: 'вулиця Пилипа Орлика, 11, Чернівці, Чернівецька область, 58000'
  }));
  createCalls.push(Clinic.create({
      name: 'The VetLife Clinic',
      latitude: 48.25202691901743, 
      longitude: 25.933840457741685,
      imgUrl: 'https://s3.eu-central-1.amazonaws.com/listmusor/production/257715/gallery/big/5fdfbe61da210.jpg?1316609607',
      onlyVaccinated: true,
      onlyPassport: true,
      phoneNumber: '+380937001234',
      address: 'вулиця Південно-Кільцева, 2а, Чернівці, Чернівецька область, 58013'
  }));
  console.log('createCalls', createCalls);
  return await Promise.allSettled(createCalls);
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  }

  module.exports = {
   initMockData
  };
  