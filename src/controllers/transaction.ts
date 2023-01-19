import { Request, Response } from "express";
import dotenv from "dotenv";
const _ = require("lodash");
import Transaction from "../models/transactions";
import User from "../models/user";
dotenv.config();

const multer = require("multer");

class TransactionController {
  async createTransaction(req: Request, res: Response) {
    let shot = req.file;
    if (shot) {
      const newTransaction = new Transaction({
        userId: req.body.userId,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        amount: req.body.amount,
        receiverNumber: req.body.receiverNumber,
        receiverName: req.body.receiverName,
        screenshot: shot.path,
      });

      try {
        const savedTransaction = await newTransaction.save();
        // res.status(200).json(savedTransaction);
        User.findOne({ _id: req.body.userId })
          .exec()
          .then((user) => {
            if (user) {
              let temp = user.numberOfTxn;
              const updateTxn = {
                numberOfTxn: temp + 1,
              };
              user = _.extend(user, updateTxn);
              if (user) {
                user.save((err, result) => {
                  if (err) {
                    return res.status(400).json({
                      message: "Invalid user",
                      error: err,
                    });
                  } else {
                    return res.status(200).json({
                      message: "Transaction Successful",
                    });
                  }
                });
              }
            }
          })
          .catch((err) => {
            return res.status(500).json({
              message: err,
            });
          });
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
    }
    // res.sendStatus(200).json({ error: "file not found" });
  }

  async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await Transaction.find().sort({ createdAt: -1 });
      return res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  getUserTransactions(req: Request, res: Response) {
    Transaction.find({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .exec()
      .then((txns) => {
        return res.send(txns);
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  }

  async changeStatus(req: Request, res: Response) {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (transaction) {
        transaction.status = !transaction.status;
        await transaction.save();
        return res.status(200).json(transaction);
      }
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
}

export default TransactionController;
