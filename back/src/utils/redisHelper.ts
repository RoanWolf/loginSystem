import { Redis } from "ioredis";
import { redisConfig } from "../configs/config.ts";

let redis: Redis | null = null;

function getRedis() {
  if (!redis) {
    redis = new Redis({
      host: redisConfig.host,
      port: Number(redisConfig.port) || 6379,
    });
  }
  return redis;
}

// 单例
export default getRedis();