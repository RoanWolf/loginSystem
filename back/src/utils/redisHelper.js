import Redis from "ioredis";
import { redisConfig } from "../config/config.js";


let redis;
function getRedis() {
  if (!redis) {
    redis = new Redis({
      host: redisConfig.host,
      port: redisConfig.port
    });
  }
  return redis;
}
// 单例
export default getRedis();
