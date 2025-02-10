/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
  const port = config.port || 8000;
  try {
    await mongoose.connect(
      `mongodb+srv://${config.db_user_name}:${config.db_Pass}@cluster0.37yfgb3.mongodb.net/ali-ashraf-portfolio-main?retryWrites=true&w=majority&appName=Cluster0`
    );
    server = app.listen(port, () => {
      console.log(`ali your server running on port http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(error);
  }
}
main();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "Reason:", reason);
  console.log("Shutting down the server gracefully...");

  if (server) {
    server.close(() => {
      console.log("Server closed. Exiting process.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
  console.log("Shutting down the server immediately...");
  process.exit(1);
});
