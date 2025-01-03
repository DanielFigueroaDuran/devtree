import express from "express";
import cors from "cors";
import router from "./routers/router";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";

connectDB();
const app = express();

//Cors
app.use(cors(corsConfig));

//Read Form Data
app.use(express.json());

app.use('/', router)

// app.get('/', (req, res) => {
//       res.send('Hola Mundo en Express');
//})

export default app;