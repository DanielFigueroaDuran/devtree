import { white } from "colors";
import { CorsOptions } from "cors";
import "dotenv/config";

//console.log(process.argv);

export const corsConfig: CorsOptions = {

      origin: function (origin, callback) {
            const whiteList = [process.env.FRONTEND_URL];

            //with this it allows us to use thunder Client y Postman

            if (process.argv[2] === '--api') {
                  whiteList.push(undefined);
            };

            if (whiteList.includes(origin)) {
                  callback(null, true);
            } else {
                  callback(new Error('Error de CORS'));
            };
      }
};