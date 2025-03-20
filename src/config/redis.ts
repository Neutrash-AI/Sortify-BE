const redis = require("redis");

// Konfigurasi Redis
const REDIS_HOST = "localhost";
const REDIS_PORT = 6379;
const CHANNEL_NAME = "camera_frames";

// Buat subscriber Redis
const subscriber = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});
// Subscribe ke channel
subscriber.subscribe(CHANNEL_NAME);

// Export subscriber
module.exports = subscriber;
