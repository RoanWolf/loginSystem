// 数据库
export const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
};

// 限流器
export const rateLimitConfig = {
  windowMs: 1000, // 1second
  limit: 50,
};

// redis
export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

// 验证码
export const captchaConfig = {
  size: 4, // 4 位字符
  noise: 1, // 干扰线
  color: true, // 彩色
  background: "#fff",
  ignoreChars: "0oO1ilIL9qQUuvV",
};
