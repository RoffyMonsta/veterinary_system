import express from "express";
import { verifyToken } from "../middleware/verifyToken.middleware";
import animalRoutes from "./animal.routes";
import areaSymptomRoutes from "./area-symptom.routes";
import authRouter from "./auth.routes";
import clinicRoutes from "./clinic.routes";
import userRouter from "./user.routes";

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', verifyToken , userRouter);
apiRouter.use('/animal', verifyToken , animalRoutes);
apiRouter.use('/clinic', clinicRoutes);
areaSymptomRoutes.use('/symptom', areaSymptomRoutes);

export default apiRouter;