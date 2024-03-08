import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };


import authRouter from "./routes/authRouter.js";
import boardsRouter from "./routes/boardsRouter.js";
import columnsRouter from "./routes/columnsRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import helpRouter from "./routes/helpRouter.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", authRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/help", helpRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({
    message: err.message ?? "Internal Server Error",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
