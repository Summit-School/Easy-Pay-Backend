import { Request, Response } from "express";
import dotenv from "dotenv";
import Transaction from "../models/transactions";
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
        screenshot: shot.path,
      });

      console.log(newTransaction);

      try {
        const savedTransaction = await newTransaction.save();
        res.status(200).json(savedTransaction);
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
