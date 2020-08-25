require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
const morganOption = config.NODE_ENV === 'production' ? 'tiny' : 'common';
import RecentReview from './Routes/RecentReview/RecentReview';
import Review from './Routes/Review/Review';
import Login from './Routes/Login/Login';
import knex from 'knex';

const app = express();
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use(function errorHandler(error: any, req: any, res: any, next: any) {
  let response;
  if (config.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

const checkToken = (req: any, res: any, next: any) => {
  const header = req.headers['authorization'];

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};

const db = knex({
  client: 'pg',
  connection: config.DATABASE_URL,
});

app.set('db', db);

app.use('/api/login', Login);
app.use('/api/review', Review);
app.use('/api/recent-review', RecentReview);

app.listen(8000, () => console.log('Server Running'));

module.exports = app;
