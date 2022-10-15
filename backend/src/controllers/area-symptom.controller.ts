import { Request, Response } from 'express';
import { Symptom } from '../models/symptom.model';
import { Clinic } from "../models/clinic.model";
export class AreaSymptomController {
  getAllSymptoms(req: Request, res: Response) {
    Symptom.findAll()
    .then(symptoms => {
      res.status(200).send(symptoms);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }
}