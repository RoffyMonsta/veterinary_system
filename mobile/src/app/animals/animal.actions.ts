import { HttpErrorResponse } from '@angular/common/http';
import { Animal } from './animal.model';


export class GetAnimals {
  static type = '[Animal] GetAnimals';
}
export class GetAnimalsSuccess {
  static type = '[Animal] GetAnimalsSuccess';
  constructor(public animals: Animal[]) {}
}

export class GetAnimalsFail {
  static type = '[Animal] GetAnimalsFail';
  constructor(public err: HttpErrorResponse) {}
}

export class GetAnimal {
  static type = '[Animal] GetAnimal';
  constructor(public animalId: number) {}
}
export class GetAnimalSuccess {
  static type = '[Animal] GetAnimalSuccess';
  constructor(public animal: Animal) {}
}

export class GetAnimalFail {
  static type = '[Animal] GetAnimalFail';
  constructor(public err: HttpErrorResponse) {}
}

export class DeleteAnimal {
  static type = '[Animal] DeleteAnimal';
  constructor(public animalId: number) {}
}
export class DeleteAnimalSuccess {
  static type = '[Animal] DeleteAnimalSuccess';
  constructor(public animalId: number) {}
}

export class DeleteAnimalFail {
  static type = '[Animal] DeleteAnimalFail';
  constructor(public err: HttpErrorResponse) {}
}

export class AddAnimal {
  static type = '[Animal] AddAnimal';
  constructor(public animal: Animal) {}
}
export class AddAnimalSuccess {
  static type = '[Animal] AddAnimalSuccess';
  constructor(public animal: Animal) {}
}

export class AddAnimalFail {
  static type = '[Animal] AddAnimalFail';
  constructor(public err: HttpErrorResponse) {}
}

export class SelectAnimal {
  static type = '[Animal] Select';
  constructor(public animalId: number) {}
}
