import mongoose, { Schema } from "mongoose";

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

const User = mongoose.model('User', userShema);

export default User;