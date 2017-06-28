import * as express from 'express';
import * as path from 'path';

import constants from './config/constants';
import './config/database';
import middlewaresConfig from './config/middleware';
import apiRoutes from './modules';

const app = express();

middlewaresConfig(app);

app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

apiRoutes(app);

app.listen(constants.PORT, err => {
  if (err) throw err
  else {
    console.log(`
      Server runing on port ${constants.PORT}
      Running on ${process.env.NODE_ENV}
      Learn Corean
    `);
  }
});

export default app;
