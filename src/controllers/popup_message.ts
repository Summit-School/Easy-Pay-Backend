import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const _ = require("lodash");

import PopupMessage from "../models/popup_message";

dotenv.config();

class PopupController {
  createPopupMessage(req: Request, res: Response) {
    PopupMessage.find()
      .exec()
      .then((response) => {
        if (response.length >= 1) {
          return res.status(500).json({
            message: "Popup message already exists",
          });
        } else {
          const newMessage = new PopupMessage({
            message: req.body.message,
          });

          newMessage
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Popup message created successfully",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      })
      .catch((err: any) => {
        return res.status(500).json({
          message: "Update Failed",
        });
      });
  }

  getPopupMessage(req: Request, res: Response) {
    PopupMessage.findOne()
      .exec()
      .then((response) => {
        return res.send(response);
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }

  updatePopupMessage(req: Request, res: Response) {
    PopupMessage.findOne({ _id: req.params.id })
      .exec()
      .then((response) => {
        const updatedMessage = {
          message: req.body.message,
        };

        response = _.extend(response, updatedMessage);
        if (response) {
          response.save((err, result) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              return res.status(200).json({
                message: "Popup message updated successfully",
              });
            }
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }

  deletePopupMessage(req: Request, res: Response) {
    PopupMessage.deleteOne({ _id: req.params.id })
      .exec()
      .then((response) => {
        return res.status(200).json({
          message: "Popup message deleted successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }
}

export default PopupController;
