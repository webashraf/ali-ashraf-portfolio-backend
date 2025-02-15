/* eslint-disable no-unused-vars */
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler.ts";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

const corsOptions = {
  credentials: true,
  origin: ["https://ali-ashraf.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// routes
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send(
    "<h2 style='font-family: Arial, sans-serif; color: #4a4a4a; text-align: center; padding: 20px; background-color: #f0f0f0; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>Hello! Ali Ashraf Portfolio</h2>"
  );
});

// Global error handler
app.use(globalErrorHandler);

// not found routes
app.use(notFound);
export default app;
