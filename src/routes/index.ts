import * as express from 'express';
import { Router } from 'express';
import UserController from '../controllers/users';
import ChatController from '../controllers/chat';

const router: Router = express.Router();

// User controller
router.get('/login', UserController.fetchUserProfile);
router.post('/login', UserController.saveUser);

// Chat controller
router.post('/conversation', ChatController.saveChat);
router.get('/conversation', ChatController.fetchConversationList);
router.get('/conversation/:id', ChatController.fetchChat);

export default router;
