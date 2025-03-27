import { Server, Socket } from "socket.io";

import { subscriber, CHANNEL_NAME } from "../config/redis";

export default (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    // Subscribe to Redis channel
    subscriber.subscribe(CHANNEL_NAME, (message: string) => {
      try {
        // message adalah string, parse ke object
        // Format payload:
        // { "hasModel": bool, "timestamp": <time>, "image": <b64> }
        const data = JSON.parse(message.replace(/'/g, '"'));
        // Kirim data ke client via WebSocket
        socket.emit("camera_frames", data);
        // console.log("Message from Redis:", data);
      } catch (err) {
        console.error("Error parsing message from Redis:", err);
      }
    });
  });
};
