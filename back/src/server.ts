import app from './app.ts';
import logger from './utils/logger.ts';
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});

