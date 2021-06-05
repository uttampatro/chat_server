import express, { Router, Request, Response } from 'express';
import UserController from '../controllers/users';
import ChatController from '../controllers/chat';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.send('server up and running');
});

// User controller
router.get('/users', UserController.fetchUserProfile);
router.post('/login', UserController.loginUser);

// Chat controller
router.post('/conversation', ChatController.saveChat);
router.get('/conversation', ChatController.fetchConversationList);
router.get('/conversation/:id', ChatController.fetchChat);

export default router;
