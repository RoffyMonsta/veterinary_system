import { User } from "../models/user.model";
import { Request, Response } from 'express';
import { Animal } from "../models/animal.model";
export class AnimalController {
  getAnimals(req: Request, res: Response) {
    Animal.findAll({
      where: {
        userId: req.userId,
      }
    })
    .then(animals => {
      res.status(200).send(animals);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }

  getAnimalById(req: Request, res: Response) {
    Animal.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    })
    .then(animal => {
      res.status(200).send(animal);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }

  deleteAnimal(req: Request, res: Response) {
    Animal.destroy({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    })
    .then(() => {
      res.status(200).send(req.params.id);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }

  addAnimal(req: Request, res: Response) {
    Animal.create({
      name: req.body.name,
      imgUrl: req.body.imgUrl,
      age: req.body.age,
      userId: req.userId,
      vaccinated: req.body.vaccinated,
      passport: req.body.passport,
      kind: req.body.kind,
      breed: req.body.breed
    }).then((animal)=>{
      res.status(200).send(animal);
  })
  .catch(err => {
    return res.status(500).send({ message: err.message });
  });
  }

  updateAnimal(req: Request, res: Response) {
    Animal.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.userId
      },
      returning: true
    },)
    .then(animal => {
      res.status(200).send(animal[1][0]);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }
}