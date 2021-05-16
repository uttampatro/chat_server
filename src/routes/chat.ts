import * as express from "express";
import { Router } from "express";
import ChatController from "../controllers/chat"

const router: Router = express.Router();

router.get("/conversationList", ChatController.fetchConversationList)

router.post("/conversation", ChatController.createConversation)
router.get("/conversation/:id", ChatController.fetchChat)

export default router;