/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { State, NgxsOnInit, Store, Action, StateContext, Selector } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Animal } from './animal.model';
import { AnimalService } from './animal.service';
import {
  AddAnimal,
  AddAnimalFail,
  AddAnimalSuccess,
  DeleteAnimal,
  DeleteAnimalFail,
  DeleteAnimalSuccess,
  GetAnimal,
  GetAnimalFail,
  GetAnimals,
  GetAnimalsFail,
  GetAnimalsSuccess,
  GetAnimalSuccess,
  SelectAnimal} from './animal.actions';

export class AnimalStateModel {
  loading: boolean;
  loaded: boolean;
  error: string;
  animals: Animal[];
  selectedId: number;
}

@State<AnimalStateModel>({
  name: 'animal',
  defaults: {
    loading: false,
    loaded: false,
    error: null,
    animals: null,
    selectedId: null
  },
})
@Injectable()
export class AnimalState implements NgxsOnInit {
  constructor(
    private animalService: AnimalService
  ) {}

  @Selector()
  static error(state: AnimalStateModel): string{
    return state.error;
  };

  @Selector()
  static animals(state: AnimalStateModel): Animal[]{
    console.log(state.animals);
    return state.animals;
  };

  @Selector()
  static currentAnimal(state: AnimalStateModel): Animal{
    return state.animals.find(a=>a.id === state.selectedId);
  };
  @Selector()
  static isLoaded(state: AnimalStateModel): boolean{
    return state.loaded;
  };
ngxsOnInit(){}

@Action(GetAnimals)
  getAnimals(
    ctx: StateContext<AnimalStateModel>) {
    ctx.patchState({
      loading: true,
      loaded: false
    });
    this.animalService.fetchAll().subscribe(
      animals => ctx.dispatch(new GetAnimalsSuccess(animals)),
      err => ctx.dispatch(new GetAnimalsFail(err))
    );
  }

  @Action(GetAnimalsSuccess)
  getAnimalsSuccess(
    ctx: StateContext<AnimalStateModel>, {animals}: GetAnimalsSuccess) {
      ctx.patchState({
        loading: false,
        loaded: true,
        animals
      });
  }

  @Action(GetAnimalsFail)
  getAnimalsFail(
    ctx: StateContext<AnimalStateModel>, {err}: GetAnimalsFail) {
      ctx.patchState({
        loading: false,
        loaded: false,
        error: err.error.message
      });
  }

  @Action(GetAnimal)
  getAnimal(
    ctx: StateContext<AnimalStateModel>, {animalId}: GetAnimal) {
    ctx.patchState({
      loading: true,
      loaded: false
    });
    this.animalService.fetchById(animalId).subscribe(
      animal => ctx.dispatch(new GetAnimalSuccess(animal)),
      err => ctx.dispatch(new GetAnimalFail(err))
    );
  }

  @Action(GetAnimalSuccess)
  getAnimalSuccess(
    ctx: StateContext<AnimalStateModel>, {animal}: GetAnimalSuccess) {
      const state = ctx.getState();
      const animals = [...state.animals];
      animals[animal.id] = animal;
      ctx.patchState({
        loading: false,
        loaded: true,
        animals
      });
  }

  @Action(GetAnimalFail)
  getAnimalFail(
    ctx: StateContext<AnimalStateModel>, {err}: GetAnimalFail) {
      ctx.patchState({
        loading: false,
        loaded: false,
        error: err.error.message
      });
  }

  @Action(AddAnimal)
  addAnimal(
    ctx: StateContext<AnimalStateModel>, {animal}: AddAnimal) {
    ctx.patchState({
      loading: true,
      loaded: false
    });
    if(!animal.breed.length){
      animal.breed = 'purebred';
    }
    this.animalService.addAnimal(animal).subscribe(
      success => ctx.dispatch(new AddAnimalSuccess(success)),
      err => ctx.dispatch(new AddAnimalFail(err))
    );
  }

  @Action(AddAnimalSuccess)
  addAnimalSuccess(
    ctx: StateContext<AnimalStateModel>, {animal}: AddAnimalSuccess) {
      console.log(animal);
      const state = ctx.getState();
      const tmpAnimals = [...state.animals];
      tmpAnimals.push(animal);
      const animals = tmpAnimals;
      ctx.patchState({
        loading: false,
        loaded: true,
        animals: tmpAnimals
      });
  }

  @Action(AddAnimalFail)
  addAnimalFail(
    ctx: StateContext<AnimalStateModel>, {err}: AddAnimalFail) {
      ctx.patchState({
        loading: false,
        loaded: false,
        error: err.error.message
      });
  }

  @Action(SelectAnimal)
  selectAnimal(
    ctx: StateContext<AnimalStateModel>, {animalId}: SelectAnimal) {
      ctx.patchState({
        loading: false,
        loaded: false,
        selectedId: animalId
      });
  }

  @Action(DeleteAnimal)
  deleteAnimal(
    ctx: StateContext<AnimalStateModel>, {animalId}: DeleteAnimal) {
    ctx.patchState({
      loading: true,
      loaded: false
    });
    this.animalService.delete(animalId).subscribe(
      animal => ctx.dispatch(new DeleteAnimalSuccess(animalId)),
      err => ctx.dispatch(new DeleteAnimalFail(err))
    );
  }

  @Action(DeleteAnimalSuccess)
  deleteAnimalSuccess(
    ctx: StateContext<AnimalStateModel>, {animalId}: DeleteAnimalSuccess) {
      const state = ctx.getState();
      const animals = [...state.animals];
      const animalsFiltered = animals.filter(a=>a.id !== animalId);
      ctx.patchState({
        loading: false,
        loaded: true,
        animals: animalsFiltered
      });
  }

  @Action(DeleteAnimalFail)
  deleteAnimalFail(
    ctx: StateContext<AnimalStateModel>, {err}: DeleteAnimalFail) {
      ctx.patchState({
        loading: false,
        loaded: false,
        error: err.error.message
      });
  }
}

