import app from './app.js';
import logger from './utils/logger.js';
const port = process.env.PORT;

app.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});

