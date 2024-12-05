import User from "../models/User";
import { Request, Response } from 'express';
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
      const { email, password } = req.body;
      //console.log(email);
      const userExists = await User.findOne({ email });
      // console.log(userExists);

      if (userExists) {
            const error = new Error('El Usuario ya esta Registrado');
            res.status(409).json({ error: error.message });
            return;
      }

      const user = new User(req.body);
      user.password = await hashPassword(password);
      await user.save();
      res.status(201).send('Usuario Creado Correctamente');
      return;
};