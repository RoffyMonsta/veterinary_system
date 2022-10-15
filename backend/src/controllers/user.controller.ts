import { User } from "../models/user.model";
import { Request, Response } from 'express';
export class UserController {
  updateUser(req: Request, res: Response) {
    User.update(req.body, {
      where: {
        id: req.userId,
      },
      returning: true
    },)
    .then(user => {
      res.status(200).send(user[1][0]);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }

  getUserById(req: Request, res: Response) {
    User.findOne({
      where: {
        id: req.userId,
      },
    })
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }
}