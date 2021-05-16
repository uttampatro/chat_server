import * as express from "express";
import { Router } from "express";
import UserController from "../controllers/users";

const router: Router = express.Router();

router.get("/:id", UserController.fetchUserProfile);
router.post("/user", UserController.saveUser);

export default router;
