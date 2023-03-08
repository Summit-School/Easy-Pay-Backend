import express, { Router } from "express";
import AuthController from "../controllers/auth";
import { Request, Response } from "express";

const router: Router = express.Router();
const authCtl: any = new AuthController();

router.post("/test_email", authCtl.testEmail);
router.post("/signup", authCtl.signUp);
router.get("/confirmation/:verificationToken", authCtl.verifyEmail);
router.post("/login", authCtl.login);
router.get("/user_data/:id", authCtl.getUserData);
router.get("/get_all_users", authCtl.getAllUsers);
router.put("/update_user/:id", authCtl.updateUser);
router.put("/update_password/:id", authCtl.updatePassword);
router.post("/forgot_password", authCtl.forgotPassword);
router.post("/reset_password", authCtl.resetPassword);
router.delete("/delete_user/:id", authCtl.deleteone);
router.put("/new_password/:id", authCtl.newPassword);

export default router;
