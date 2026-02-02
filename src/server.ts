import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { appDataSource } from "./database/dataSource.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

import errorHandler from "./middleware/errorHandler.js";

import pesquisadorRoutes from "./routes/pesquisadorRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import areaRoutes from "./routes/areaRoutes.js";
import leituraRoutes from "./routes/leituraRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

app.set('trust proxy', 1);

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
}))

app.use(helmet({
    contentSecurityPolicy: true
}))
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(compression({ threshold: 1024 }));
app.use(errorHandler);

app.use('/api', pesquisadorRoutes);
app.use('/api', sensorRoutes);
app.use('/api', areaRoutes);
app.use('/api', leituraRoutes);

// Tentando se conectar com o banco de dados
appDataSource.initialize()
    .then(() => {
        console.log("Conectad ao banco")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })

