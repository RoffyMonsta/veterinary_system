export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Clinic {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  address: string;
  pic: string;
  distance?: number;
  onlyVaccinated: boolean;
  onlyPassport: boolean;
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
