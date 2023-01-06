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
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        amount: req.body.amount,
        screenshot: shot.path,
      });

      try {
        const savedTransaction = await newTransaction.save();
        res.status(200).json(savedTransaction);
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
    }
  }

  async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await Transaction.find();
      return res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
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
