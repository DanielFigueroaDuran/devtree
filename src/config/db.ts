import "dotenv/config";
import mongoose from "mongoose";
import colors from 'colors';

export const connectDB = async () => {
      try {
            const url = process.env.MONGO_URI;
            const { connection } = await mongoose.connect(url);
            const url2 = `${connection.host}:${connection.port}`;

            console.log(colors.cyan.bold(`MongoDB Conectado en el puerto ${url2}`));
      } catch (error) {
            console.log(colors.bgRed.white.bold(error.message));
            process.exit(1);
      }
}