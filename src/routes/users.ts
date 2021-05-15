import * as express from "express";
import { Router } from "express";
import { fetchUserProfile, saveUser } from "../controllers/users";

const router: Router = express.Router();


router.get("/me", fetchUserProfile);
router.get("/auth/github", saveUser);


export default router;
