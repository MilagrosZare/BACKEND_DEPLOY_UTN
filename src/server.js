import ENVIROMENT from "./config/enviroment.config.js";
import express from 'express';
import authRouter from "./routes/auth.router.js";
import mongoose from "./config/mongoDB.config.js";
import cors from 'cors';
import workspace_router from "./routes/workspace.router.js";
import channelRouter from "./routes/channel.router.js";

const app = express();
app.use(cors())

const corsOptions = {
    origin: 'https://frontend-deploy-tp.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

console.log("Frontend URL:", ENVIROMENT.URL_FRONTEND);

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://frontend-deploy-tp.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/workspaces', workspace_router);
app.use('/api/channels', channelRouter);

app.listen(ENVIROMENT.PORT, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${ENVIROMENT.PORT}`);
});