import express, { Request, Response } from "express";
import dotenv from "dotenv";
const http = require("http");
const cors = require("cors");
import bodyParser = require("body-parser");

import dbConnect from "./configs/db";
import authAPI from "./apis/auth";
import adminAPI from "./apis/admin";
import rateAPI from "./apis/conversionRate";
import popupMessageAPI from "./apis/popup_message";
import conversationAPI from "./apis/conversation";
import messageAPI from "./apis/message";
import transactionAPI from "./apis/transactions";
import expoNotificationAPI from "./apis/expo_notification";
import emailAPI from "./apis/email";

dotenv.config();
const app = express();
dbConnect();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

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
app.use(`/api/${process.env.API_VERSION}/email`, emailAPI);

app.use(authAPI);
app.use(adminAPI);
app.use(rateAPI);
app.use(popupMessageAPI);
app.use(conversationAPI);
app.use(messageAPI);
app.use(transactionAPI);
app.use(expoNotificationAPI);
app.use(emailAPI);

// TEST ROUTE
app.get("/", (req: Request, res: Response) => {
  res.send("Easy Pay Backend. WE MOVE 🚀");
});

const PORT: any = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, HURRAY!!!!!`);
});
