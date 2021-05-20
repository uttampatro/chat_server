import * as express from 'express';
import { Router } from 'express';
import UserController from '../controllers/users';
import ChatController from '../controllers/chat';

const router: Router = express.Router();

// User controller
router.get('/user/', UserController.fetchUserProfile);
router.post('/user', UserController.saveUser);

// Chat controller
router.get('/conversation', ChatController.fetchConversationList);
router.get('/conversation/:id', ChatController.fetchChat);

export default router;
