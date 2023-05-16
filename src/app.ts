import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const http = require("http");
const cors = require("cors");
import bodyParser = require("body-parser");
import { sendPushNotification } from "./services/push_notification/expo.notification";
// socket import
const socketIO = require("socket.io");

import dbConnect from "./configs/db";
import authAPI from "./apis/auth";
import adminAPI from "./apis/admin";
import rateAPI from "./apis/conversionRate";
import popupMessageAPI from "./apis/popup_message";
import conversationAPI from "./apis/conversation";
import messageAPI from "./apis/message";
import transactionAPI from "./apis/transactions";
import expoNotificationAPI from "./apis/expo_notification";

dotenv.config();
const app = express();
dbConnect();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const PORT: any = process.env.PORT || 5000;
const server = http.createServer(app);

let users: { userId: any; socketId: any }[] = [];

const addUser = (userId: any, socketId: any) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: any) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: any) => {
  return users.find((user) => user.userId === userId);
};

const io = socketIO(server, {
  cors: {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  },
});

io.on("connection", (socket: any) => {
  // when connected
  console.log("user connected");

  // get userId and ssocketId from user
  socket.on("addUser", (userId: any) => {
    addUser(userId, socket.id);
  });

  // send and get messages between users and admin
  socket.on(
    "sendMessage",
    ({
      senderId,
      receiverId,
      text,
    }: {
      senderId: any;
      receiverId: any;
      text: any;
    }) => {
      const user = getUser(receiverId);
      const message = [senderId, receiverId];
      io.to(user?.socketId).emit("getMessage", { message, text });
    }
  );

  // when disconnected
  socket.on("disconnect", () => {
    console.log("a user is disconnected");
    removeUser(socket.id);
  });
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use(`/api/${process.env.API_VERSION}/auth`, authAPI);
app.use(`/api/${process.env.API_VERSION}/admin`, adminAPI);
app.use(`/api/${process.env.API_VERSION}/conversionRate`, rateAPI);
app.use(`/api/${process.env.API_VERSION}/conversation`, conversationAPI);
app.use(`/api/${process.env.API_VERSION}/message`, messageAPI);
app.use(`/api/${process.env.API_VERSION}/popupMessage`, popupMessageAPI);
app.use(`/api/${process.env.API_VERSION}/transactions`, transactionAPI);
app.use(
  `/api/${process.env.API_VERSION}/expo_notification`,
  expoNotificationAPI
);

app.use(authAPI);
app.use(adminAPI);
app.use(rateAPI);
app.use(popupMessageAPI);
app.use(conversationAPI);
app.use(messageAPI);
app.use(transactionAPI);
app.use(expoNotificationAPI);

// TEST ROUTE
app.get("/", (req: Request, res: Response) => {
  res.send("Easy Pay Backend. WE MOVE 🚀");
});

app.post("/testPush", async (req: Request, res: Response) => {
  return await sendPushNotification({
    body: "test message",
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, HURRAY!!!!!`);
});
