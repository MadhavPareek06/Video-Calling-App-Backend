import express from "express";
import http from "http";
import { Server } from "socket.io";
import ServerConfig from "./config/serverConfig";
import cors from "cors";
import roomHandler from "./handlers/roomHandler";


const app = express();
app.use(cors());

const server = http.createServer(app);

const io =new Server(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  console.log(`New User Connected: ${socket.id}`);
  roomHandler(socket);
  socket.on("disconnected",()=>{
    console.log(`User Disconnected: ${socket.id}`);
  })
  });

 
server.listen(ServerConfig.PORT, () => {

  console.log(`Server is running on port ${ServerConfig.PORT}`);
});