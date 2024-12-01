import express from "express";
import router from "./routers/router";

const app = express();

//Read Form Data
app.use(express.json());

app.use('/', router)

// app.get('/', (req, res) => {
//       res.send('Hola Mundo en Express');
//})

export default app;