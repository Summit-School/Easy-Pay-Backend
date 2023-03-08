import { Request, Response } from "express";
import dotenv from "dotenv";

import ExpoTokens from "../models/expoTokens";

dotenv.config();

class ExpoController {
  // getTokens(req: Request, res: Response) {
  //   console.log("helloss");
  //   ExpoTokens.find({})
  //     .exec()
  //     .then((admin) => {
  //       return res.send(admin);
  //     })
  //     .catch((err) => {
  //       return res.status(500).json({
  //         message: err,
  //       });
  //     });
  // }

  async saveToken(req: Request, res: Response) {
    console.log("helloss");
    const token = new ExpoTokens({
      token: req.body.token,
    });
    try {
      const saved = await token.save();
      return res.status(200).json(saved);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  }

  async getTokens(req: Request, res: Response) {
    try {
      const tokens = await ExpoTokens.find({});
      res.status(200).send(tokens);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
}

export default ExpoController;
