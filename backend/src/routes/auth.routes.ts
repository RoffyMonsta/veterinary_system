import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { checkDuplicateUsernameOrEmail } from "../middleware/checkDuplicateUsernameAndEmail.middleware";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/signup', [
  checkDuplicateUsernameOrEmail
], authController.signUp);

authRouter.post('/signin', authController.signIn);

authRouter.get('/confirm/:confirmationCode', authController.verifyUser);

export default authRouter;