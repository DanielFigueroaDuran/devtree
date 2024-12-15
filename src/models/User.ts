import mongoose, { Schema } from "mongoose";

export interface IUser {
      handle: string
      name: string
      email: string
      password: string
};

const userShema = new Schema({
      handle: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
      },
      name: {
            type: String,
            required: true,
            trin: true
      },
      email: {
            type: String,
            required: true,
            trin: true,
            unique: true,
            lowercase: true
      },
      password: {
            type: String,
            required: true,
            trin: true
      }
});

const User = mongoose.model<IUser>('User', userShema);

export default User;