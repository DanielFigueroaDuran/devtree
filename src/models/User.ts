import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
      handle: string
      name: string
      email: string
      password: string
      description: string
      image: string
      links: string
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
      },
      description: {
            type: String,
            default: ''
      },
      image: {
            type: String,
            default: ''
      },
      links: {
            type: String,
            default: '[]'
      }
});

const User = mongoose.model<IUser>('User', userShema);

export default User;