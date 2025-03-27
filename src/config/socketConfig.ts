import { Server } from "socket.io";

import cameraHandlers from "../socketHandlers/cameraHandlers";

export default (server: any) => {
  const io = new Server(server, {
    // ! This is a security risk, only use it for development
    cors: {
      origin: "http://localhost:5173",
    },
    maxHttpBufferSize: 1e8, // max buffer size (100 MB) for http messages
    serveClient: false, // we use separate socket.io client in frontend
  });
  cameraHandlers(io);
};
