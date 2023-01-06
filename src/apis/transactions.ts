import express, { Router } from "express";
import TransactionController from "../controllers/transaction";
import { Request, Response } from "express";

const router: Router = express.Router();
const txnCtl: any = new TransactionController();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: any, cb: Function) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req: Request, file: any, cb: Function) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

router.post(
  "/newTransaction",
  upload.single("screenshot"),
  txnCtl.createTransaction
);
router.get("/get_all_transactions", txnCtl.getAllTransactions);
router.put("/update_txn_state/:id", txnCtl.changeStatus);

export default router;
