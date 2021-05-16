import * as express from 'express';
import { Router } from 'express';
import UserController from '../controllers/users';
import ChatController from '../controllers/chat';

const router: Router = express.Router();

// User controller
router.get('/:id', UserController.fetchUserProfile);
router.post('/user', UserController.saveUser);

// Chat controller
router.get(
    '/conversation',
    async (req: express.Request, res: express.Response) => {
        console.log('HIT1');
    }
);
router.post('/conversation', ChatController.createConversation);
router.get('/conversation/:id', ChatController.fetchChat);

export default router;
