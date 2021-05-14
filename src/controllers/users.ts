import { getRepository } from "typeorm";
import { Request, Response } from "express";
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
  const githubToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  const decode = querystring.parse(githubToken);

  const accessToken = decode.access_token;

  return axios
    .get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error getting user from GITHUB");
      throw error;
    });
}

export const signIn = async (req: Request, res: Response) => {
  const code = get(req, "query.code");
  const path = get(req, "query.path");

  if (!code) {
    throw new Error("No code!!");
  }
  const githubUser = await getGithubUser({ code });

  const token = jwt.sign(githubUser, secret); 

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    domain: "localhost",
  });

  res.redirect(`http://localhost:3000${path}`);
};

export const fetchUserProfile = async (req: Request, res: Response) => {
  const cookie = get(req, `cookies[${COOKIE_NAME}]`);

  try {
    const decode = jwt.verify(cookie, secret);
    res.send(decode)
  } catch (error) {
    return  res.send(null);
  }
};
