export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Clinic {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
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
  area: string;
  description: string;
}

export interface AnimalInfo {
  age: number;
  vaccinated: boolean;
  passport: boolean;
  kind: string;
}
