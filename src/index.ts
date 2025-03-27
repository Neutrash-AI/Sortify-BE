import express, { Request, Response } from "express";
import { createServer } from "http";

import socketConfig from "./config/socketConfig";

const app = express();
const server = createServer(app);
const PORT: number = parseInt(process.env.PORT || "3000");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});

socketConfig(server);

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
