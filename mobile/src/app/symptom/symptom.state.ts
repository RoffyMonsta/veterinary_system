/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */

/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { State, NgxsOnInit, Store, Action, StateContext, Selector } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { SymptomService } from './symptom.service';
import { GetClinics,
  GetClinicsFail,
  GetClinicsSuccess,
  GetDoctors,
  GetDoctorsFail,
  GetDoctorsSuccess,
  GetLocation,
  GetLocationFail,
  GetLocationSuccess,
  SearchForClinics,
  SetClinicsToNull} from './symptom.actions';
import { AreaOfDisease, Clinic, Coordinates, Doctor } from './symptom.model';

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2): number {
  console.log('1', lat1, lon1);
  console.log('2', lat2, lon2);
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lon2-lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return Number(d.toFixed(1));
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

const Areas: AreaOfDisease[] = [
  {
    id: 1,
    name: 'Гастроентеролог',
    symptoms: [
      'Погіршення апетиту',
      'Блювання',
      'Пронос',
      'Закреп',
      'Болючість в ділянці живота',
      'Зміна кольору чи консистенції калу',
      'Відмова від корму',
      'Підвищення температури'
    ]
  },
  {
    id: 2,
    name: 'Кардіолог',
    symptoms: [
      'Задишка',
      'Кашель',
      'Ціанотичність (синюшність) слизових оболонок',
      'В’ялість',
      'Непритомність',
    ]
  },
  {
    id: 3,
    name: 'Нефролог',
    symptoms: [
      'Часте сечовипускання',
      'Рідке сечовипускання',
      'Часті позиви до сечовипускання',
      'Зменшення кількості сечі',
      'Збільшення кількості сечі ',
      'Спрага',
      'Зміна кольору чи консистенції сечі'
    ]
  },
  {
    id: 4,
    name: 'Травматолог-ортопед',
    symptoms: [
      'Перелом',
      'Забій',
      'Хромання',
      'Болючість під час згинання кінцівок'
    ]
  },
  {
    id: 5,
    name: 'Невролог',
    symptoms: [
      'Судоми',
      'Непритомність',
      'Відсутність рефлексів',
      'Парез',
      'Параліч',
      'В’ялість'
    ]
  },
  {
    id: 6,
    name: 'Дерматолог',
    symptoms: [
      'Розчухи',
      'Висипи',
      'Облисіння',
      'Інтенсивна линька',
      'Неприємний запах шкіри',
      'Рани',
      'Почервоніння шкіри'
    ]
  },
  {
    id: 7,
    name: 'Стоматолог',
    symptoms: [
      'Почервоніння ясен',
      'Зубний наліт/камінь',
      'Випадіння зубів',
      'Кровоточивість ясен',
      'Погіршення апетиту',
      'Підвищення температури'
    ]
  },
];
const Symptoms: string[] = [
  'Новоутворення',
  'Відмова від корму',
  'В’ялість',
  'Підвищення температури',
  'Погіршення апетиту',
  'Блювання',
  'Пронос',
  'Закреп',
  'Болючість в ділянці живота',
  'Зміна кольору чи консистенції калу',
  'Задишка',
  'Кашель',
  'Ціанотичність (синюшність) слизових оболонок',
  'Непритомність',
  'Часте, сечовипускання',
  'Рідке, сечовипускання',
  'Часті позиви до сечовипускання',
  'Зменшення кількості сечі',
  'Збільшення кількості сечі',
  'Спрага',
  'Зміна кольору чи консистенції сечі',
  'Перелом',
  'Забій',
  'Хромання',
  'Болючість під час згинання кінцівок',
  'Судоми',
  'Відсутність рефлексів',
  'Парез',
  'Параліч',
  'Розчухи',
  'Висипи',
  'Облисіння',
  'Інтенсивна линька',
  'Неприємний запах шкіри',
  'Рани',
  'Почервоніння шкіри',
  'Почервоніння ясен',
  'Зубний наліт/камінь',
  'Випадіння зубів',
  'Кровоточивість ясен',
].sort((a, b) => a.localeCompare(b));

export class SymptomStateModel {
  loading: boolean;
  loaded: boolean;
  error: string;
  coords: Coordinates;
  clinics: Clinic[];
  doctors: Doctor[];
  areas: AreaOfDisease[];
  symptoms: string[];
  clinicsToShow: Clinic[];
}

@State<SymptomStateModel>({
  name: 'symptom',
  defaults: {
    loading: false,
    loaded: false,
    error: null,
    coords: null,
    clinics: [],
    doctors: [],
    areas: Areas,
    symptoms: Symptoms,
    clinicsToShow: []
  },
})
@Injectable()
export class SymptomState implements NgxsOnInit {
  constructor(
    private symptomService: SymptomService
  ) {}

  @Selector()
  static error(state: SymptomStateModel): string{
    return state.error;
  };

  @Selector()
  static coords(state: SymptomStateModel): Coordinates{
    return state.coords;
  };

  @Selector()
  static symptoms(state: SymptomStateModel): string[]{
    return state.symptoms;
  };

  @Selector()
  static clinicsToShow(state: SymptomStateModel): Clinic[]{
    return state.clinicsToShow;
  };
ngxsOnInit(){}

@Action(GetLocation)
  getLocation(
    ctx: StateContext<SymptomStateModel>) {
    this.symptomService.getLocation().subscribe(
      location => ctx.dispatch(new GetLocationSuccess(location)),
      err => ctx.dispatch(new GetLocationFail(err))
    );
  }

  @Action(GetLocationSuccess)
  getLocationSuccess(
    ctx: StateContext<SymptomStateModel>, {location}: GetLocationSuccess) {
      const coords: Coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
      ctx.patchState({
        coords
      });
  }

  @Action(GetLocationFail)
  getLocationFail(
    ctx: StateContext<SymptomStateModel>, {err}: GetLocationFail) {
      console.log(err);
  }

  @Action(GetClinics)
  getClinics(
    ctx: StateContext<SymptomStateModel>) {
    this.symptomService.getClinics().subscribe(
      clinics => ctx.dispatch(new GetClinicsSuccess(clinics)),
      err => ctx.dispatch(new GetClinicsFail(err))
    );
  }

  @Action(GetClinicsSuccess)
  getClinicsSuccess(
    ctx: StateContext<SymptomStateModel>, {clinics}: GetClinicsSuccess) {
      console.log(clinics);
      ctx.patchState({
        clinics
      });
  }

  @Action(GetClinicsFail)
  getClinicsFail(
    ctx: StateContext<SymptomStateModel>, {err}: GetClinicsFail) {
      console.log(err);
  }

  @Action(GetDoctors)
  getDoctors(
    ctx: StateContext<SymptomStateModel>) {
    this.symptomService.getDoctors().subscribe(
      doctors => ctx.dispatch(new GetDoctorsSuccess(doctors)),
      err => ctx.dispatch(new GetDoctorsFail(err))
    );
  }

  @Action(GetDoctorsSuccess)
  getDoctorsSuccess(
    ctx: StateContext<SymptomStateModel>, {doctors}: GetDoctorsSuccess) {
      ctx.patchState({
        doctors
      });
  }

  @Action(GetDoctorsFail)
  getDoctorsFail(
    ctx: StateContext<SymptomStateModel>, {err}: GetDoctorsFail) {
      console.log(err);
  }

  @Action(SearchForClinics)
  searchForClinics(
    ctx: StateContext<SymptomStateModel>, {symptoms, animal}: SearchForClinics) {
      ctx.patchState({
        error: null
      });
      if (symptoms && symptoms.length){
          const date = new Date();
          const currentHour = date.getHours();
          const currentDay = date.toLocaleString('en-US', {weekday: 'long'});
          const state = ctx.getState();
          const intersections = [];
          const areas = [...state.areas];
          areas.forEach((area, iter)=>{
            intersections[iter] = area.symptoms.filter(symptom => symptoms.includes(symptom)).length;
          });
          const max = intersections.reduce((a, b) => {
            return Math.max(a, b);
          });
          const indexMax = intersections.indexOf(max);
          if (max > 0) {
            const currentArea = areas[indexMax].name;
            const rightDoctors = [...state.doctors].filter(x => {
              return x.specialization === currentArea;
            });
            const clinicIds = rightDoctors.map( val=> val.clinicId);
            const clinicsWithDoctors = [...state.clinics].filter(
              clinic => {
                return (
                  clinicIds.includes(clinic.id) &&
                  (clinic.onlyVaccinated ? (animal.vaccinated ? true: false) : true) &&
                  (clinic.onlyPassport ? (animal.passport ? true: false) : true)
                  );
              }
            );
            const workingClinics = clinicsWithDoctors.filter( clinic => {
              const currentClinicDay = clinic.workingDays.find( day => day.day === currentDay);
              return (
                currentClinicDay.startTime <= currentHour &&
                currentClinicDay.endTime > currentHour
              )
            });
            console.log('workingClinics', workingClinics);
            console.log('clinicsWithDoctors', clinicsWithDoctors);
            if(workingClinics.length){
              const coords = {...state.coords};
              if (coords !== null){
                const clinicsToShow: Clinic[] = workingClinics.map( clinic => {
                  const item = {...clinic};
                  item.distance = getDistanceFromLatLonInKm(coords.latitude, coords.longitude, item.latitude, item.longitude);
                  return item;
                });
                clinicsToShow.sort((a, b) => {
                  return a.distance - b.distance;
                });
                ctx.patchState({
                  clinicsToShow
                });
              }
              else {
                ctx.patchState({
                  clinicsToShow: clinicsWithDoctors
                });
              }
            }
            else {
              ctx.patchState({
                error: 'No clinics are working at the moment, please call the emergency phone number'
              });
            }
          }
          else {
            ctx.patchState({
              error: 'No matches for your symptoms'
            });
          }
        }
        else {
          ctx.patchState({
            error: 'No symptoms in'
          });
        }
  }

  @Action(SetClinicsToNull)
  setClinicsToNull(
    ctx: StateContext<SymptomStateModel>,) {
      ctx.patchState({
        clinicsToShow: []
      });
  }
}

