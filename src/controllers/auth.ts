import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const _ = require("lodash");
import sendEmail from "../services/email/sendEmail";

import User from "../models/user";
const bcrypt = require("bcrypt");

dotenv.config();

class AuthController {
  testEmail(req: Request, res: Response) {
    const { to, message } = req.body;
    sendEmail({
      to: to,
      subject: "Email Confirmation",
      message: message,
    });
    res.send("Done !!");
  }

  // signUp(req: Request, res: Response) {
  //   User.find({ email: req.body.email })
  //     .exec()
  //     .then((user) => {
  //       if (user.length >= 1) {
  //         return res.status(409).json({
  //           message: "Email already exists",
  //         });
  //       } else {
  //         bcrypt.hash(req.body.password, 10, (err: any, hash: any) => {
  //           if (err) {
  //             return res.status(500).json({
  //               error: err,
  //             });
  //           } else {
  //             const user = new User({
  //               firstName: req.body.firstName,
  //               lastName: req.body.lastName,
  //               email: req.body.email,
  //               phoneNumber: req.body.phoneNumber,
  //               password: hash,
  //             });
  //             user
  //               .save()
  //               .then((result) => {
  //                 res.status(201).json({
  //                   message: "Successful. Please confirm your email to log in.",
  //                 });
  //               })
  //               .catch((err) => {
  //                 res.status(500).json({
  //                   error: err,
  //                 });
  //               });

  //             const verificationToken: string = jwt.sign(
  //               {
  //                 user,
  //               },
  //               process.env.JWT_SECRET as string,
  //               {
  //                 expiresIn: "1d",
  //               }
  //             );

  //             //   const url = `${process.env.SERVER_URL}/api/${process.env.API_VERSION}/auth/confirmation/${verificationToken}`;
  //             const url = `${process.env.SERVER_URL}/confirmation/${verificationToken}`;

  //             sendEmail({
  //               to: user.email,
  //               subject: "Email confirmation",
  //               message: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
  //             });
  //           }
  //         });
  //       }
  //     });
  // }

  signUp(req: Request, res: Response) {
    User.find({ phoneNumber: req.body.phoneNumber })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "User already exists",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err: any, hash: any) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                username: req.body.username,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  const token: string = jwt.sign(
                    {
                      userId: result._id,
                      username: result.username,
                    },
                    process.env.JWT_SECRET as string,
                    {
                      expiresIn: "1h",
                    }
                  );
                  res.status(201).json({
                    message: "Account created",
                    token: token,
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

  verifyEmail(req: Request, res: Response) {
    const decodedToken: any = jwt.verify(
      req.params.verificationToken,
      process.env.JWT_SECRET as string
    );
    User.findOne({ _id: decodedToken.user._id })
      .exec()
      .then((user) => {
        const emailConfirmUpdate = {
          confirm_email: true,
        };

        user = _.extend(user, emailConfirmUpdate);

        if (user) {
          user.save((err, result) => {
            if (err) {
              res.status(400).json({
                message: "Email Verification Failed",
                error: err,
              });
            } else {
              return res
                .status(200)
                .send({ message: "Email Verification Success" });
            }
          });
        } else {
          res.status(400).json({
            message: "Email Verification Failed",
          });
        }
      })
      .catch((err: any) => {
        return res.status(500).json({
          error: err,
        });
      });
  }

  // login(req: Request, res: Response) {
  //   User.find({ email: req.body.email })
  //     .exec()
  //     .then((user) => {
  //       if (user.length < 1) {
  //         return res.status(401).json({
  //           message: "Authentication Failed",
  //         });
  //       }

  //       if (!user[0].confirm_email) {
  //         return res.status(401).json({
  //           message: "Please confirm email to login",
  //         });
  //       }

  //       bcrypt.compare(
  //         req.body.password,
  //         user[0].password,
  //         (err: any, result: any) => {
  //           if (err) {
  //             return res.status(401).json({
  //               message: "Authentication Failed",
  //             });
  //           }
  //           if (result) {
  //             const token: string = jwt.sign(
  //               {
  //                 userId: user[0]._id,
  //                 email: user[0].email,
  //               },
  //               process.env.JWT_SECRET as string,
  //               {
  //                 expiresIn: "1d",
  //               }
  //             );
  //             return res.status(200).json({
  //               message: "Login Successful",
  //               token: token,
  //             });
  //           }
  //           res.status(401).json({
  //             message: "Authentication Failed",
  //           });
  //         }
  //       );
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         error: err,
  //       });
  //     });
  // }

  login(req: Request, res: Response) {
    User.find({ phoneNumber: req.body.phoneNumber })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }

        bcrypt.compare(
          req.body.password,
          user[0].password,
          (err: any, result: any) => {
            if (err) {
              return res.status(401).json({
                message: "Authentication Failed",
              });
            }
            if (result) {
              const token: string = jwt.sign(
                {
                  userId: user[0]._id,
                  username: user[0].username,
                },
                process.env.JWT_SECRET as string
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

  getUserData(req: Request, res: Response) {
    User.findOne({ _id: req.params.id })
      .exec()
      .then((user) => {
        return res.send(user);
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  }

  getAllUsers(req: Request, res: Response) {
    User.find()
      .sort({ createdAt: -1 })
      .exec()
      .then((users) => {
        return res.send(users);
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  }

  // updateUser(req: Request, res: Response) {
  //   User.findOne({ _id: req.params.id })
  //     .exec()
  //     .then((user) => {
  //       const userUpdates = {
  //         firstName: req.body.firstName,
  //         lastName: req.body.lastName,
  //         phoneNumber: req.body.phoneNumber,
  //         email: req.body.email,
  //       };

  //       user = _.extend(user, userUpdates);

  //       if (user) {
  //         user.save((err, result) => {
  //           if (err) {
  //             return res.status(400).json({
  //               message: "Invalid user",
  //               error: err,
  //             });
  //           } else {
  //             const token: string = jwt.sign(
  //               {
  //                 userId: req.params.id,
  //                 email: req.body.email,
  //               },
  //               process.env.JWT_SECRET as string,
  //               {
  //                 expiresIn: "1d",
  //               }
  //             );
  //             return res.status(200).json({
  //               message: "Update Successful",
  //               token: token,
  //             });
  //           }
  //         });
  //       }
  //     })
  //     .catch((err: any) => {
  //       return res.status(500).json({
  //         message: "Update Failed",
  //       });
  //     });
  // }

  updateUser(req: Request, res: Response) {
    User.findOne({ _id: req.params.id })
      .exec()
      .then((user) => {
        const userUpdates = {
          username: req.body.username,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
        };

        user = _.extend(user, userUpdates);

        if (user) {
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                message: "Invalid user",
                error: err,
              });
            } else {
              const token: string = jwt.sign(
                {
                  userId: req.params.id,
                  username: req.body.username,
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
    User.findOne({ _id: req.params.id })
      .exec()
      .then((user) => {
        if (user) {
          const { currentPassword, newPassword } = req.body;
          bcrypt
            .compare(currentPassword, user.password)
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
                  user = _.extend(user, passwordUpdate);
                  if (user) {
                    user
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
    User.findOne({ email: req.body.email })
      .exec()
      .then((user: any) => {
        if (user) {
          const resetToken: string = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "1h",
            }
          );

          const token = `${resetToken}`;
          const username = `${user.username}`;

          sendEmail({
            to: user.email,
            subject: "Reset Password",
            message: `
            <div>
            Hello ${username}, 
            Copy this token below and submit in the token field to get back into your account. 
            Don't forget to update your password after this.
            </div>             
            <div style="margin-top: 20px">
            Token: <span style="color:blue">${token}</span>
            </div>
            `,
          });

          return res.status(200).json({
            message: "Email sent",
          });
        } else {
          return res.status(500).json({
            message: "Email does not exist",
          });
        }
      });
  }

  resetPassword(req: Request, res: Response) {
    const token = req.body.resetToken;
    const decodedToken: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    User.findOne({ _id: decodedToken.userId })
      .exec()
      .then((user) => {
        if (user) {
          if (user._id == decodedToken.userId) {
            return res.status(200).json({
              message: "Success",
              token: token,
            });
          }
          return res.status(500).json({
            message: "Failed to reset password",
          });
        }
      })
      .catch((err: any) => {
        return res.status(500).json({
          error: err,
        });
      });
  }

  deleteone(req: Request, res: Response) {
    User.deleteOne({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "User Deleted",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  newPassword(req: Request, res: Response) {
    User.findOne({ _id: req.params.id })
      .exec()
      .then((user) => {
        if (user) {
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
            user = _.extend(user, passwordUpdate);
            if (user) {
              user
                .save()
                .then((result: any) => {
                  const token: string = jwt.sign(
                    {
                      userId: result._id,
                      username: result.username,
                    },
                    process.env.JWT_SECRET as string,
                    {
                      expiresIn: "1h",
                    }
                  );
                  res.status(200).json({
                    message: "Password Updated",
                    token: token,
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
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
}

export default AuthController;
