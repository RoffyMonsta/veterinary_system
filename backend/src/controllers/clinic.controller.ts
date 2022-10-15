import { Request, Response } from 'express';
import { Animal } from '../models/animal.model';
import { Clinic } from "../models/clinic.model";
import { Symptom } from '../models/symptom.model';
export class ClinicController {
  getAllClinics(req: Request, res: Response) {
    Clinic.findAll()
    .then(clinics => {
      res.status(200).send(clinics);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }

  async getClosestClinicsWithFilters(req: Request, res: Response) {
    const animal: Animal = req.body.animal;
    const symptoms: Symptom[] = req.body.symptom;
    Clinic.findAll()
    .then(clinics => {
      res.status(200).send(clinics);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }
}