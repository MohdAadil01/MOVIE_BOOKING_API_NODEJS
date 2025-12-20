import { redisClient } from "./redis";

export const getCache = async (key: string) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCache = async (
  key: string,
  value: unknown,
  ttlSeconds: number
) => {
  await redisClient.set(key, JSON.stringify(value), {
    EX: ttlSeconds,
  });
};

export const deleteCache = async (key: string) => {
  await redisClient.del(key);
};
