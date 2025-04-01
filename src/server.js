import ENVIROMENT from "./config/enviroment.config.js";
import express from 'express'
import authRouter from "./routes/auth.router.js";
import mongoose from "./config/mongoDB.config.js";
import cors from 'cors'
import workspace_router from "./routes/workspace.router.js";
import channelRouter from "./routes/channel.router.js";

const app = express()

const corsOptions = {
    origin: 'https://frontend-deploy-tp.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

console.log(ENVIROMENT.URL_FRONTEND)
app.use(cors(corsOptions))

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/workspaces', workspace_router)
app.use('/api/channels', channelRouter)

app.listen(ENVIROMENT.PORT, () =>{
    console.log(`El servidor se esta ejecutando en http://localhost:${ENVIROMENT.PORT}`)
})