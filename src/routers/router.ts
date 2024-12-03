import { Router } from "express";
import User from "../models/User";

const router = Router();

// Routing Auth and Register

router.post('/auth/register', async (req, res) => {
      //console.log(req.body);
      const user = new User(req.body);
      await user.save();
});


export default router;