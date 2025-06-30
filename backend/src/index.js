import 'dotenv/config';

import { app } from './app.js';
import morgan from 'morgan';
import logger from './utils/logger.js';
import connectDB from './db/index.js';

const PORT = process.env.PORT || 3000;
const morganFormat = ':method :url :status :response-time ms';

console.log('🚀 ~ PORT:', PORT);

//! Middlewares
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);

app.get('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Server is live',
  });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Mongo Db Error: ', err);
  });
