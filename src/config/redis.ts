import { createClient } from "redis";

// Konfigurasi Redis
const REDIS_HOST: string = "localhost";
const REDIS_PORT: number = 6379;
const CHANNEL_NAME: string = "camera_frames";

// Buat subscriber Redis
const subscriber = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
// Subscribe ke channel
subscriber
  .connect()
  .catch((err) => console.error("Redis connection error:", err));

// Export subscriber
export { subscriber, CHANNEL_NAME };
