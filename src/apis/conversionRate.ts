import express, { Router } from "express";
import conversionRateController from "../controllers/conversionRate";
import { Request, Response } from "express";

const router: Router = express.Router();
const conversionRateCtl: any = new conversionRateController();

router.post("/set_rate", conversionRateCtl.setRate);
router.get("/get_rate", conversionRateCtl.getRate);

export default router;
