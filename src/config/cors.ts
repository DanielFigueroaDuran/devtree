import { CorsOptions } from "cors";
import "dotenv/config";

export const corsConfig: CorsOptions = {

      origin: function (oring, callback) {
            if (oring === process.env.FRONTEND_URL) {
                  callback(null, true);
            } else {
                  callback(new Error('Error de CORS'));
            };
      }
};