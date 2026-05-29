import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);
});

app.get("/", (req, res) => {
  res.send("Hello guys App is Running....");
});

server.listen(3000, () => {
  console.log("App is running on port 3000");
});