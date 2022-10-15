import express from "express";
import { ClinicController } from "../controllers/clinic.controller";

const clinicRoutes = express.Router();
const clinicController = new ClinicController();

clinicRoutes.get('/', clinicController.getAllClinics);

export default clinicRoutes;