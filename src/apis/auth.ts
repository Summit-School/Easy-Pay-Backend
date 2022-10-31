import express, { Router } from "express";
import AuthController from "../controllers/auth";
import { Request, Response } from "express";

const router: Router = express.Router();
const authCtl: any = new AuthController();

router.post("/test_email", authCtl.testEmail);
router.post("/signup", authCtl.signUp);
router.get("/confirmation/:verificationToken", authCtl.verifyEmail);
router.post("/login", authCtl.login);
router.put("/update_user/:id", authCtl.updateUser);
router.put("/update_password/:id", authCtl.updatePassword);
router.get("/forgot_password", authCtl.forgotPassword);
router.put("/reset_password/:resetToken", authCtl.resetPassword);
router.delete("/delete_user/:id", authCtl.deleteone);

export default router;
