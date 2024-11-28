import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT;

// Routing

app.get('/', (req, res) => {
      res.send('Hola Mundo en Express');
})

app.listen(port, () => {
      console.log('Servidor Funcionando');
});