import { HttpErrorResponse } from '@angular/common/http';
import { AnimalInfo, Clinic, Doctor } from './symptom.model';


export class GetLocation {
  static type = '[Symptom] GetLocation';
}
export class GetLocationSuccess {
  static type = '[Symptom] GetLocationSuccess';
  constructor(public location: GeolocationPosition) {}
}

export class GetLocationFail {
  static type = '[Symptom] GetLocationFail';
  constructor(public err: any) {}
}

export class GetClinics {
  static type = '[Symptom] GetClinics';
}
export class GetClinicsSuccess {
  static type = '[Symptom] GetClinicsSuccess';
  constructor(public clinics: Clinic[]) {}
}

export class GetClinicsFail {
  static type = '[Symptom] GetClinicsFail';
  constructor(public err: any) {}
}

export class GetDoctors {
  static type = '[Symptom] GetDoctors';
}
export class GetDoctorsSuccess {
  static type = '[Symptom] GetDoctorsSuccess';
  constructor(public doctors: Doctor[]) {}
}

export class GetDoctorsFail {
  static type = '[Symptom] GetDoctorsFail';
  constructor(public err: any) {}
}

export class SearchForClinics {
  static type = '[Symptom] Search For Clinics';
  constructor(public symptoms: string[], public animal: AnimalInfo) {}
}

export class SetClinicsToNull {
  static type = '[Symptom] Set Clinics To Null';
}

