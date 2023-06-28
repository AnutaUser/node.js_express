import express, { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as swaggerUi from 'swagger-ui-express';

import { configs } from './configs';
import { cronRunner } from './crons';
import { ApiError } from './errors';
import { authRouter, userRouter } from './routers';
import swagger from './utils/swagger.json';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swagger));

app.use((err: ApiError, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(configs.PORT, async () => {
  await cronRunner();
  await mongoose.connect(configs.DB_URL);
  // eslint-disable-next-line no-console
  console.log(`started on PORT: ${configs.PORT} 😉`);
});
