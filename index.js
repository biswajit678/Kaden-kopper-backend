import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js"
import adminRouter from "./src/routes/admin.routes.js";
import { globalErrorHandler } from "./src/utils/handler.utils.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/admin", adminRouter);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on Port:${PORT}`);
})