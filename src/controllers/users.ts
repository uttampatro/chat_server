import { Request, Response } from "express";
import { get } from "lodash";
// import axios from 'axios';
// import { User } from '../entity/User';
import { UserService } from "../services";
// import { Message } from '../entity/Message';

class UserController {
  fetchUserProfile = async (req: Request, res: Response) => {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };

  saveUser = async (req: Request, res: Response) => {
    try {
      const githubId = get(req, "body.githubId");
      const email = get(req, "body.email");

      const user = await UserService.saveUser({ githubId, email });

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
  // createMessage = async (req:Request, res:Response) => {

  //     try {
  //         const userId = get(req, "body.id")
  //         const content = get(req, "body.content")
  //         // const { userId, content } = get(req, "body")

  //         // const userID = await User.findOneOrFail({ id: userId })
  //         const message = new Message()
  //         message.content = content
  //         await message.save()
  //         return res.json(message)
  //     } catch (error) {
  //         console.log(error);
  //         res.send(error);
  //     }
  // }
}

export default new UserController();
