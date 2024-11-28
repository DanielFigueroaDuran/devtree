import express from "express";

const app = express();

// Routing

app.get('/', (req, res) => {
      res.send('Hola Mundo en Express');
})

export default app;