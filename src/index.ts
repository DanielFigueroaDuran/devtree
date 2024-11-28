import "dotenv/config";
import server from "./server";


const port = process.env.PORT || 4000;

server.listen(port, () => {
      console.log('Servidor Funcionando');
});