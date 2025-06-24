import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { connectDB } from "./lib/database.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();

//-> create http server
const server = http.createServer(app);

//-> Initialise socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

//-> store online users
export const userSocketMap = {}; // {userId:socketId}

//-> Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //! emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//-> middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Sever is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 5000;

//-> connection with Database
connectDB()
  .then(() => {
    console.log("DB connected");
    server.listen(PORT, () => {
      console.log(`Server is running http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed !!!", err);
  });
