import bcrypt from "bcrypt";
import type { Request, Response } from "express";

import redis from "../utils/redisHelper.ts";
import db from "../models/index.ts";
import logger from "../utils/logger.ts";
import { markEmail } from "../utils/mark.ts";
import { getToken } from "../utils/jwtHelper.ts";

import { text, data, uuid } from "../services/captcha.ts";
const register = async (req: Request, res: Response) => {
  const { email, password, uuid, inputCode } = req.body;
  if (!email || !password || !uuid || !inputCode) {
    return res.status(400).send("required params missing");
  }

  try {
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send("user already exists");
    }
    const hash = await bcrypt.hash(password, 10);
    await db.User.create({
      email,
      password: hash,
    });
    logger.info(`created user ${markEmail(email)}`);
  } catch (error: unknown) {
    logger.error("register error");
    if (error instanceof Error) {
      return res.status(500).send(error.message);
    }
    return res.status(500).send("An unknown error occurred");
  }

  return res.status(200).send("register ok");
};
interface UserInstance {
  id: number;
  email: string;
  password: string;
}
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("required params missing");
  }

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send("user not found");
    }
    
    const userData = user.toJSON() as UserInstance;
    const match = await bcrypt.compare(password, userData.password);
    if (!match) {
      logger.warn(`User ${markEmail(email)} failed to login`);
      return res.status(401).send("invalid password");
    }
    const token = getToken(email);

    return res.status(200).send({ token, message: "ok" });
  } catch (err: any) {
    logger.error("Login error:");
    return res.status(500).send("internal server error");
  }
};

const captcha = async (req: Request, res: Response) => {
  await redis.set(`captcha:uuid:${uuid}`, text, "EX", 300);
  return res.json({
    key: uuid,
    svg: data,
  });
};

export { register, login, captcha };
