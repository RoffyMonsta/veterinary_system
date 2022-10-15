import express from "express";
import { AnimalController } from "../controllers/animal.controller";

const animalRoutes = express.Router();
const animalController = new AnimalController();

animalRoutes.get('/', animalController.getAnimals);
animalRoutes.get('/:id', animalController.getAnimalById);
animalRoutes.post('/', animalController.addAnimal);
animalRoutes.put('/:id', animalController.updateAnimal);
animalRoutes.delete('/:id', animalController.deleteAnimal);

export default animalRoutes;