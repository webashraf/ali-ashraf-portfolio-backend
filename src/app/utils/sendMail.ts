import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, otp: string, subject: string) => {
  const transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: Number(config.smtp_port),
    secure: config.NODE_ENV === "production",
    auth: {
      user: config.service_user,
      pass: config.mail_app_pass,
    },
  });

  await transporter.sendMail({
    from: config.send_from,
    to,
    subject: subject,
    text: "Set your new password within 5 minutes",
    html: `<div style="max-width: 600px; border: 1px dashed #4caf50; padding: 10px 20px;  width: 100%; background-color:rgb(255, 248, 242); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center;">
        <h1 style="font-size: 24px; color: #4caf50; margin-bottom: 20px;">Your One-Time Password</h1>
        <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">This OTP will expire in <strong style="color: #4caf50;">${config.otp_expires}</strong> minutes.</p>
        <div style=" display: inline-block; background-color: #FF4F00;  padding: 10px 20px; font-size: 24px; font-weight: bold; color:rgb(255, 255, 255); letter-spacing: 4px; border-radius: 8px; margin-bottom: 20px;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #888888; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
      </div>`,
  });
};
