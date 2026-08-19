import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/tasks", taskRoutes);

app.use(errorMiddleware);

export default app;
