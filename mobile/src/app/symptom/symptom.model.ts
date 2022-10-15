export interface Coordinates {
  longitude: number;
  latitude: number;
}

export enum Weekdays {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export interface Clinic {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  address: string;
  imgUrl: string;
  distance?: number;
  onlyVaccinated: boolean;
  onlyPassport: boolean;
  phoneNumber: string;
  workingDays: WorkingDay[];
};

export interface WorkingDay {
  id: number,
  day: Weekdays,
  startTime: number,
  endTime: number,
  clinicId: number
}

export interface AreaOfDisease {
  id: number;
  name: string;
  symptoms: string[];
}

export interface Doctor {
  id: number;
  fullname: string;
  imgurl: string;
  specialization: string;
  description: string;
  clinicId: number;
}

export interface AnimalInfo {
  age: number;
  vaccinated: boolean;
  passport: boolean;
  kind: string;
}
