import mongoose, { Schema } from "mongoose";

interface IUser {
      name: String
      email: String
      password: String
}

const userShema = new Schema({
      name: {
            type: String,
            required: true,
            trin: true
      },
      email: {
            type: String,
            required: true,
            trin: true,
            unique: true
      },
      password: {
            type: String,
            required: true,
            trin: true
      }
});

const User = mongoose.model<IUser>('User', userShema);

export default User;