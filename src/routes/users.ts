import * as express from 'express';
import { Router } from 'express';
import { fetchUserProfile, signIn } from '../controllers/users';

const router: Router = express.Router();

router.get('/auth/github', signIn);
router.get('/me', fetchUserProfile)

export default router;