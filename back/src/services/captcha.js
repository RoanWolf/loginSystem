import svgCaptcha from "svg-captcha";
import { v4 as uuidv4 } from "uuid";

import { captchaConfig } from "../config/config.js";

const { text, data } = svgCaptcha.create(captchaConfig);
const uuid = uuidv4();

export { text, data, uuid };
