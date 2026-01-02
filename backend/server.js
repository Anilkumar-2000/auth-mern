import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:5173'];
console.log(allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();

    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);

    app.listen(port, () =>
      console.log(`Server is running at http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
