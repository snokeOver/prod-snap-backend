import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import allRoutes from "./routes/allRoutes.js";

// Initialize environment access
dotenv.config();
const mongoDBUrl = process.env.MONGO_URL;
const allowedUrls = process.env.PERMITTED_URLS.split(",");
const port = process.env.SERVER_PORT || 3000;

// Initialization
const app = express();

// Connect mongoDB via mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUrl);
    console.log("DB Connection Successful!");
  } catch (err) {
    console.log("DB Connection Failed:", err.message);
  }
};
connectDB();

//  Primary Middlewares
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedUrls.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  })
);

app.use("/api", allRoutes);

app.listen(port, () => {
  console.log("MobileSnap is listening on port:", port);
});
