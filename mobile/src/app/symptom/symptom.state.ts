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

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
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
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

const Areas: AreaOfDisease[] = [
  {
  id: 1,
  name: 'Home pets',
  symptoms: [
    'Symptom1', 'Symptom2', 'Symptom3'
  ]
  },
  {
    id: 2,
    name: 'area2',
    symptoms: [
      'Symptom2', 'Symptom4', 'Symptom1'
    ]
    },
  {
    id: 3,
    name: 'area3',
    symptoms: [
      'Symptom4', 'Symptom1', 'Symptom2'
    ]
    }
];
const Symptoms: string[] = [
  'Symptom1',
  'Symptom2',
  'Symptom3',
  'Symptom4',
  'Symptom5',
  'Symptom6',
  'Symptom7',
  'Symptom8',
  'Symptom9',
  'Symptom10',
  'Symptom11',
  'Symptom12',
  'Symptom13',

];
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
      console.log(animal);
      ctx.patchState({
        error: null
      });
      if (symptoms){
        if (symptoms.length){
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
              return x.area === currentArea;
            });
            const clinicIds = rightDoctors.map( val=> val.id);
            const clinicsWithDoctors = [...state.clinics].filter(
              clinic => {
                return (
                  clinicIds.includes(clinic.id) &&
                  (clinic.onlyVaccinated ? (animal.vaccinated ? true: false) : true) &&
                  (clinic.onlyPassport ? (animal.passport ? true: false) : true)
                  );
              }
            );
            if(clinicsWithDoctors.length){
              const coords = {...state.coords};
              if (coords !== null){
                const clinicsToShow: Clinic[] = clinicsWithDoctors.map( clinic => {
                  const item = {...clinic};
                  item.distance = getDistanceFromLatLonInKm(coords.latitude, coords.longitude, item.latitude, item.longitude);
                  return item;
                });
                clinicsToShow.sort((a, b) => {
                  return a.distance - b.distance;
                });
                console.log(clinicsToShow);
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
                error: 'No matches for your symptoms'
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

