import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const _ = require("lodash");
import User from "../models/user";
import sendEmail from "../services/email/sendEmail";
// import { sendPushNotification } from "../services/push_notification/expo.notification";

import Rate from "../models/rate";
const bcrypt = require("bcrypt");

dotenv.config();

class conversionRateController {
  setRate(req: Request, res: Response) {
    Rate.findOne()
      .exec()
      .then((rate) => {
        const newRate = {
          cfa: req.body.cfa,
        };

        rate = _.extend(rate, newRate);
        if (rate) {
          rate.save((err, result: any) => {
            if (err) {
              return res.status(400).json({
                message: "Invalid rate",
                error: err,
              });
            } else {
              User.find()
                .sort({ createdAt: -1 })
                .exec()
                .then((users) => {
                  let mailList: Array<String> = [];
                  users.map((user) => mailList.push(user?.email));
                  sendEmail({
                    to: mailList.toString(),
                    subject: "Rate Updated",
                    message: `
                    <div>
                    Easy Kings Pay updated its exchange rate. 
                    </div>
                    <div>
                    Log into the application to see the new rate.
                    </div>
                    `,
                  });
                })
                .catch((err) => {
                  return res.status(500).json({
                    message: err,
                  });
                });
              // sendPushNotification({
              //   body: "Easy Kings Pay Updated its exchange rate. Click to view new rate",
              // });
              return res.status(200).json({
                message: "Rate Updated",
              });
            }
          });
        }
      })
      .catch((err: any) => {
        return res.status(500).json({
          message: "Update Failed",
        });
      });
  }

  getRate(req: Request, res: Response) {
    Rate.findOne()
      .exec()
      .then((rate) => {
        return res.send(rate);
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  }
}

export default conversionRateController;
