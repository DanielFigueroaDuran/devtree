import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

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

export const login = async (req: Request, res: Response) => {
      // handle errors
      // let errors = validationResult(req);
      // //console.log(errors);
      // if (!errors.isEmpty()) {
      //       res.status(400).json({ errors: errors.array() });
      //       return;
      // };

      const { email, password } = req.body;

      //check if the user is registered
      const user = await User.findOne({ email });
      // console.log(userExists);

      if (!user) {
            const error = new Error('El Usuario no existe');
            res.status(404).json({ error: error.message });
            return;
      };

      //check password
      const isPasswordCorrect = await checkPassword(password, user.password);
      //console.log(isPasswordCorrect);
      if (!isPasswordCorrect) {
            const error = new Error('Password Incorrecto');
            res.status(401).json({ error: error.message });
            return;
      };
      res.send('Autenticado...');
};