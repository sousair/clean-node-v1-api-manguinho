import { MongoHelper } from './../infra/database/mongodb/helpers/mongo-helper';
import app from './config/app';
import env from './config/env';

const mongoHelper = new MongoHelper();
mongoHelper
  .connect(env.mongoUrl)
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`);
    });
  })
  .catch(console.error);
