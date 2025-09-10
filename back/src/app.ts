import express from "express";
import cors from "cors";


import auth from "./routes/auth.ts";
import limiter from './utils/rateLimit.ts'
import {verifyToken} from './middlewares/verifyToken.ts'
const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use('/api/auth',auth);
app.use(verifyToken);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
export default app;
