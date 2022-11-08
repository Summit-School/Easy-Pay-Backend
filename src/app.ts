import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const http = require("http");
const cors = require("cors");
import dbConnect from "./configs/db";
import authAPI from "./apis/auth";
import adminAPI from "./apis/admin";
import rateAPI from "./apis/conversionRate";
import popupMessageAPI from "./apis/popup_message";
import conversationAPI from "./apis/conversation";
import messageAPI from "./apis/message";

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
app.use(authAPI);
app.use(adminAPI);
app.use(rateAPI);
app.use(popupMessageAPI);
app.use(conversationAPI);
app.use(messageAPI);

// TEST ROUTE
app.get("/", (req: Request, res: Response) => {
  res.send("Easy Pay Backend. WE MOVE 🚀");
});

const PORT: any = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, HURRAY!!!!!`);
});
