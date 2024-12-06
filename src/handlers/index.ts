import { Request, Response } from 'express';
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
      const { default: slug } = await import("slug");

      const { email, password } = req.body;
      const userExists = await User.findOne({ email });
      // console.log(userExists);

      if (userExists) {
            const error = new Error('Un Usuario con ese email ya esta Registrado');
            res.status(409).json({ error: error.message });
            return;
      };

      const handle = slug(req.body.handle, '');
      const handleExists = await User.findOne({ handle });
      if (handleExists) {
            const error = new Error('Nombre de Usuario no Disponible');
            res.status(409).json({ error: error.message });
            return;
      };

      const user = new User(req.body);
      user.password = await hashPassword(password);
      user.handle = handle;

      await user.save();
      res.status(201).send('Usuario Creado Correctamente');
      return;
};