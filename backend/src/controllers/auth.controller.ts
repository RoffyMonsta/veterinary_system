import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import nodemailer  from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2"
  },
  auth: {
      user: "vet.mailer123@gmail.com",
      pass: "fdmwrhvtnoisatnr"
      // antonlomovatskyivetmailerpass
  }
});

export class AuthController {

  signUp(req: Request, res: Response) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
      sendConfirmationEmail(
        user.username,
        user.email,
        user.confirmationCode
    );
      res.status(200).send({ message: "User registered successfully!", user });
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }

  signIn(req: Request, res: Response) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
    .then(user => {
      if (user) {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        if (user.status != "Active") {
          return res.status(401).send({
              message: "Pending Account. Please Verify Your Email!",
          });
        }
        
        if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
          const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: 86400 }
          );
          res.status(200).send({
            message: "User signed in successfully!",
            token,
            user
          });
        } else {
          return res.status(401).send({ message: "Invalid password!" });
        }
      } else {
        return res.status(401).send({ message: "Invalid email!" });
      }
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  }

  verifyUser(req: Request, res: Response) {
    User.findOne({
            where: { confirmationCode: req.params.confirmationCode, }
      })
      .then((user) => {
          if (!user) {
              return res.status(404).send({ message: "User Not found." });
          }
          user.status = "Active";
          user.save().catch((err : any) => {
            console.error(err);
            return res.status(500).send({ message: err });
          });
      })
  }
};

  function sendConfirmationEmail(name: string, email: string, confirmationCode: string) {
    const mailOptions = {
        from: process.env.MAILER_USER,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${process.env.SERVER_HOST}:${process.env.PORT}/api/auth/confirm/${confirmationCode}> Click here</a>
            </div>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error.message);
        }
    });
  };