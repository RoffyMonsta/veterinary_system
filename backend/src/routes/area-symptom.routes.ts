import express from "express";
import { AreaSymptomController } from "../controllers/area-symptom.controller";

const areaSymptomRoutes = express.Router();
const areaSymptomController = new AreaSymptomController();

areaSymptomRoutes.get('/', areaSymptomController.getAllSymptoms);

export default areaSymptomRoutes;