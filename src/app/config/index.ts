import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_user_name: process.env.DB_USER,
  db_Pass: process.env.DB_PASS,
  bcrypt_salt: process.env.BCRYPT_SALT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,

  // # Mail and  OTP
  service_user: process.env.SERVICE_USER,
  mail_app_pass: process.env.MAIL_APP_PASS,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  otp_expires: process.env.OTP_EXPIRE,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  send_from: process.env.SEND_FROM,
};
