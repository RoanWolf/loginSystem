import { rateLimit } from "express-rate-limit";

import { rateLimitConfig } from "../configs/config.ts";

const limiter = rateLimit(rateLimitConfig);

export default limiter;
