import express, { Router } from "express";
import sendEmail from "../services/email/sendEmail";
import { Request, Response } from "express";

const router: Router = express.Router();
const sendEmailCtl: any = new sendEmail();

router.post("/send-email", sendEmailCtl.mailer);

export default router;
