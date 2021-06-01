import { Request, Response } from 'express';
import { get } from 'lodash';
import { UserService } from '../services';

class UserController {
    fetchUserProfile = async (req: Request, res: Response) => {
        try {
            const users = await UserService.findUsers();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };

    saveUser = async (req: Request, res: Response) => {
        try {
            const email = get(req, 'body.email');
            const password = get(req, 'body.password');
            const user = await UserService.saveUser({ email, password });

            if (user) {
                return res.send(user);
            } else {
                return await user.save();
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    };
}

export default new UserController();
