import express, { Request, Response } from "express";

import { subscriber, CHANNEL_NAME } from "./config/redis";

const app = express();
const PORT: number = parseInt(process.env.PORT || "3000");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});

// Subscribe to Redis channel
subscriber.subscribe(CHANNEL_NAME, (message: string) => {
  try {
    // message adalah string, parse ke object
    // Format payload:
    // { "hasModel": bool, "timestamp": <time>, "image": <b64> }
    const data = JSON.parse(message.replace(/'/g, '"'));
  } catch (err) {
    console.error("Error parsing message from Redis:", err);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
