import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import swaggerUI from "swagger-ui-express";
import { routerV1 } from "./src/routes/v1.0";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/api/v1", routerV1);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

