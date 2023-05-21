import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const _ = require("lodash");
// import sendEmail from "../services/email/sendEmail";

import Admin from "../models/admin";
const bcrypt = require("bcrypt");

dotenv.config();

class AdminController {
  signUp(req: Request, res: Response) {
    Admin.find({ email: req.body.email })
      .exec()
      .then((admin) => {
        if (admin.length >= 1) {
          return res.status(409).json({
            message: "Email already exists",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err: any, hash: any) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const admin = new Admin({
                username: req.body.username,
                email: req.body.email,
                password: hash,
              });
              admin
                .save()
                .then((result) => {
                  res.status(201).json({
                    message: "Successful",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  }

  login(req: Request, res: Response) {
    Admin.find({ email: req.body.email })
      .exec()
      .then((admin) => {
        if (admin.length < 1) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }

        bcrypt.compare(
          req.body.password,
          admin[0].password,
          (err: any, result: any) => {
            if (err) {
              return res.status(401).json({
                message: "Authentication Failed",
              });
            }
            if (result) {
              const token: string = jwt.sign(
                {
                  userId: admin[0]._id,
                  email: admin[0].email,
                },
                process.env.JWT_SECRET as string,
                {
                  expiresIn: "1d",
                }
              );
              return res.status(200).json({
                message: "Login Successful",
                token: token,
              });
            }
            res.status(401).json({
              message: "Authentication Failed",
            });
          }
        );
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  getAdminData(req: Request, res: Response) {
    Admin.findOne({ _id: req.params.id })
      .exec()
      .then((admin) => {
        return res.send(admin);
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  }

  updateUser(req: Request, res: Response) {
    Admin.findOne({ _id: req.params.id })
      .exec()
      .then((admin) => {
        const userUpdates = {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
        };

        admin = _.extend(admin, userUpdates);

        if (admin) {
          admin.save((err, result) => {
            if (err) {
              return res.status(400).json({
                message: "Invalid user",
                error: err,
              });
            } else {
              const token: string = jwt.sign(
                {
                  userId: req.params.id,
                  email: req.body.email,
                },
                process.env.JWT_SECRET as string,
                {
                  expiresIn: "1d",
                }
              );
              return res.status(200).json({
                message: "Update Successful",
                token: token,
              });
            }
          });
        }
      })
      .catch((err: any) => {
        return res.status(500).json({
          message: "Update Failed",
        });
      });
  }

  updatePassword(req: Request, res: Response) {
    Admin.findOne({ _id: req.params.id })
      .exec()
      .then((admin) => {
        if (admin) {
          const { currentPassword, newPassword } = req.body;
          bcrypt
            .compare(currentPassword, admin.password)
            .then((match: any) => {
              if (match) {
                bcrypt.hash(newPassword, 10, (error: any, hash: any) => {
                  if (error) {
                    return res.status(500).json({
                      error: error,
                    });
                  }
                  const passwordUpdate = {
                    password: hash,
                  };
                  admin = _.extend(admin, passwordUpdate);
                  if (admin) {
                    admin
                      .save()
                      .then((result: any) => {
                        res.status(200).json({
                          message: "Password Updated",
                        });
                      })
                      .catch((error: any) => {
                        res.status(500).json({
                          error: error,
                        });
                      });
                  }
                });
              } else {
                return res.status(500).json({
                  message: "Passwords do not match",
                });
              }
            })
            .catch((err: any) => {
              return res.status(401).json({
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  forgotPassword(req: Request, res: Response) {
    Admin.findOne({ email: req.body.email })
      .exec()
      .then((admin: any) => {
        if (admin) {
          const resetToken: string = jwt.sign(
            {
              admin,
            },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "1h",
            }
          );

          const url = `${process.env.SERVER_URL}/reset_admin_password/${resetToken}`;

          // sendEmail({
          //   to: admin.email,
          //   subject: "Reset Password",
          //   message: `Click this link to reset your password: <a href="${url}">${url}</a>`,
          // });
        } else {
          return res.status(500).json({
            message: "Email does not exist",
          });
        }
      });
  }

  resetPassword(req: Request, res: Response) {
    const decodedToken: any = jwt.verify(
      req.params.resetToken,
      process.env.JWT_SECRET as string
    );
    Admin.findOne({ _id: decodedToken.user._id })
      .exec()
      .then((admin) => {
        if (admin) {
          const { newPassword } = req.body;
          bcrypt.hash(newPassword, 10, (error: any, hash: any) => {
            if (error) {
              return res.status(500).json({
                error: error,
              });
            }
            const passwordUpdate = {
              password: hash,
            };
            admin = _.extend(admin, passwordUpdate);
            if (admin) {
              admin
                .save()
                .then((result: any) => {
                  res.status(200).json({
                    message: "Password Updated",
                  });
                })
                .catch((error: any) => {
                  res.status(500).json({
                    error: error,
                  });
                });
            }
          });
        }
      })
      .catch((err: any) => {
        return res.status(500).json({
          error: err,
        });
      });
  }
}

export default AdminController;
