import express, { Request, Response } from "express";
import { User } from "../entity/User";
import { get } from "lodash";
import axios from "axios";
import querystring from "querystring";
import jwt from "jsonwebtoken";

require("dotenv").config();

const GITHUB_CLIENT_ID = process.env.CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.CLIENT_SECRET;
const secret = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME;

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: null;
  company: null;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: string;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

async function getGithubUser({ code }: { code: string }): Promise<GitHubUser> {
  try {
    const response = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`
    );

    const githubToken = response.data;

    const decode = querystring.parse(githubToken);

    const accessToken = decode.access_token;
    console.log("Access Token =>", accessToken);

    return axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
}

export const fetchUserProfile = async (req: Request, res: Response) => {
  try {
    const cookie = get(req, `cookies[${COOKIE_NAME}]`);

    const decode = jwt.verify(cookie, secret);
    res.send(decode);
  } catch (error) {
    return res.send(null);
  }
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const code = get(req, "body.code");
    const path = get(req, "query.path");

    const githubUser = await getGithubUser({ code });
    const token = jwt.sign(githubUser, secret);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      domain: "localhost",
    });
    res.redirect(`http://localhost:3000${path}`);

    const user = new User();
    user.username = githubUser.login;
    user.github_id = githubUser.id;
    await user.save();

    if (user) {
      return res.send(user.username);
    } else {
      return await user.save();
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// export const getUserById = async (req: Request, res: Response) => {
//   try {
//     const code = get(req, "query.code");
//     const githubUser = await getGithubUser({ code });

//     const user = await User.find()

//     return res.json(user)

//   } catch (error) {
//     console.log(error)
//   }
// }
