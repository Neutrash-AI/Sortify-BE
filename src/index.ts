import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { subscriber, CHANNEL_NAME } from "./config/redis";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  // ! This is a security risk, only use it for development
  cors: {
    origin: "http://localhost:5173",
  },
  maxHttpBufferSize: 1e8, // max buffer size (100 MB) for http messages
  serveClient: false, // we use separate socket.io client in frontend
});
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
    // Kirim data ke client via WebSocket
    io.emit("camera_frames", data);
    // console.log("Message from Redis:", data);
  } catch (err) {
    console.error("Error parsing message from Redis:", err);
  }
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
