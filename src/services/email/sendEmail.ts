import nodemailer from "nodemailer";
import dotenv from "dotenv";
import email from "./templates/email_template";
import { Request, Response } from "express";

dotenv.config();

interface Option {
  to: string;
  subject: string;
  message: string;
}

class sendEmail {
  async mailer(req: Request) {
    const option = req.body;
    const html: string = email(option.subject, option.message);
    const transporter: any = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions: any = {
      from: "easykingspay237@gmail.com",
      to: option.to,
      subject: option.subject,
      html: html,
    };
    try {
      const result = transporter.sendMail(mailOptions);
      transporter.close();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

export default sendEmail;

// export default function mailer(option: Option): void {
//   const html: string = email(option.subject, option.message);
//   const transporter: any = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   const mailOptions: any = {
//     from: "easykingspay237@gmail.com",
//     to: option.to,
//     subject: option.subject,
//     html: html,
//   };
//   try {
//     const result = transporter.sendMail(mailOptions);
//     transporter.close();
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }
