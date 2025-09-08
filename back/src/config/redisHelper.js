import Redis from "ioredis";

let redis;

function getRedis() {
  if (!redis) {
    redis = new Redis({
      host: "127.0.0.1",
      port: 6379,
    });
  }
  return redis;
}
// 单例
export default getRedis();
