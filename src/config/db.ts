import "dotenv/config";
import mongoose from "mongoose";

export const connectDB = async () => {
      try {
            const url = process.env.MONGO_URI;
            const { connection } = await mongoose.connect(url);
            const url2 = `${connection.host}:${connection.port}`;

            console.log(`MongoDB Conectado en el puerto ${url2}`);
      } catch (error) {
            console.log(error.message);
            process.exit(1);
      }
}