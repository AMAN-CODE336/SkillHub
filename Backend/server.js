import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userroutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js"
import { errorHandler } from "./middlewares/errorMiddleware.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course" , courseRoutes)
app.use("/api/enroll" , enrollmentRoutes )
app.use("/api/payment", paymentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("SkillHub backend running...");
});

// Error handler must be last
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
