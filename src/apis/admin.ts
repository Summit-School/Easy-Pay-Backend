import express, { Router } from "express";
import AdminController from "../controllers/admin";
import { Request, Response } from "express";

const router: Router = express.Router();
const adminCtl: any = new AdminController();

router.post("/register_admin", adminCtl.signUp);
router.post("/admin_login", adminCtl.login);
router.get("/admin_data/:id", adminCtl.getAdminData);
router.put("/update_admin/:id", adminCtl.updateUser);
router.put("/update_admin_password/:id", adminCtl.updatePassword);
router.get("/forgot_admin_password", adminCtl.forgotPassword);
router.put("/reset_admin_password/:resetToken", adminCtl.resetPassword);

export default router;
