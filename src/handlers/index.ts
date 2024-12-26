import type { Request, Response } from 'express';
//import { validationResult } from 'express-validator';
import { formidable } from "formidable";
import { v4 as uuid } from "uuid";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from '../utils/jwt';
import { contextsKey } from 'express-validator/lib/base';
//import jwt from 'jsonwebtoken';
import User from '../models/User';
import cloudinary from "../config/cloudinary";
//import slug from 'slug';


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
      res.status(201).send('Registro Creado Correctamente');
      return;
};

export const login = async (req: Request, res: Response) => {

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

      const token = generateJWT({ id: user._id });

      res.send(token);
};

export const getUser = async (req: Request, res: Response) => {
      res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response) => {
      const { default: slug } = await import("slug");

      try {
            const { description } = req.body;

            const handle = slug(req.body.handle, '');
            const handleExists = await User.findOne({ handle });

            if (handleExists && handleExists.email !== req.user.email) {
                  const error = new Error('Nombre de Usuario no Disponible');
                  res.status(409).json({ error: error.message });
                  return;
            };

            // Update Users
            req.user.description = description;
            req.user.handle = handle;
            await req.user.save();
            res.send('Perfil Actualizado Correctammente');
            return;

      } catch (e) {
            const error = new Error('Hubo un error');
            res.status(500).json({ error: error.message });
            return;
      }
};

export const uploadImage = async (req: Request, res: Response) => {
      const form = formidable({ multiples: false });

      try {
            form.parse(req, (error, fields, files) => {
                  // console.log(files.file[0].filepath);
                  cloudinary.uploader.upload(files.file[0].filepath, { public_id: uuid() }, async function (error, result) {
                        if (error) {
                              const error = new Error('Hubo un error al subir la imagen');
                              res.status(500).json({ error: error.message });
                              return;
                        };

                        if (result) {
                              // console.log(result.secure_url);
                              req.user.image = result.secure_url
                              await req.user.save();
                              res.json({ image: result.secure_url });
                        };

                  });
            })
      } catch (e) {
            const error = new Error('Hubo un error');
            res.status(500).json({ error: error.message });
            return
      }
}