import svgCaptcha from "svg-captcha";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import redis from "../config/redisHelper.js";
import db from "../models/index.js";
import logger from "../utils/logger.js";
import { markEmail } from "../utils/mark.js";
const register = async (req, res) => {
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
  } catch (error) {
    logger.error("register error")
    return res.status(500).send(error.message);
  }

  return res.status(200).send("register ok");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("required params missing");
  }

  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send("user not found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      logger.warn(`User ${markEmail(email)} failed to login`);
      return res.status(401).send("invalid password");
    }
    logger.info(`user ${markEmail(email)} logged in`);
    return res.status(200).send("login ok");
  } catch (err) {
    logger.error("Login error:");
    return res.status(500).send("internal server error");
  }
};

const captcha = async (req, res) => {
  const captcha = svgCaptcha.create({
    size: 4, // 4 位字符
    noise: 1, // 干扰线
    color: true, // 彩色
    background: "#fff",
    ignoreChars: "0oO1ilIL9qQUuvV",
  });

  // uuid 作为 key 5min 有效期
  const key = uuidv4();
  await redis.set(`captcha:uuid:${key}`, captcha.text, "EX", 300);
  return res.json({
    key,
    svg: captcha.data,
  });
};

export { register, login, captcha };
