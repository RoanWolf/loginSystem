import { rateLimit } from "express-rate-limit";

import { rateLimitConfig } from "../config/config.js";

const limiter = rateLimit(rateLimitConfig);

export default limiter;
