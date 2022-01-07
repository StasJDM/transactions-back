import express, { Application, Request, Response } from 'express';
import router from './src/api/routes';
import { sequelize } from './src/db/models';
import cors from 'cors';

const app: Application = express();
const port = 3000;

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(cors());
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return res.status(200).send({ message: 'Check!' });
});

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
