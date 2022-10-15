import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';

export async function checkDuplicateUsernameOrEmail(req: Request, res: Response, next: NextFunction) {
  // Username
  const userNameDuplicate = await User.findOne({
    where: {
      username: req.body.username
    }});
  if (userNameDuplicate) {
    return res.status(400).send({
      message: "Failed! Username is already in use!"
    });
  }

  // Email
  const emailDuplicate = await User.findOne({
    where: {
      email: req.body.email
    }});
  if (emailDuplicate) {
    return res.status(400).send({
      message: "Failed! Email is already in use!"
    });
  }
  next();
}