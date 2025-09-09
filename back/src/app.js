import express from "express";
import cors from "cors";


import auth from "./routes/auth.js";
import limiter from './utils/rateLimit.js'
const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use('/api/auth',auth);

export default app;
