import http from 'http';
import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { port } from './config';
import usersRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import ordersRoutes from './routes/orders.routes';
import transactionsRoutes from './routes/transactions.routes';
import swaggerUi from 'swagger-ui-express';
import { specs } from './lib/swagger';
// import { ZodError } from 'zod';
// import { BadRequestError } from './lib/errorExtended';
import ApiError from './helpers/ApiError';
import { errorConverter, errorHandler } from './middlewares/error';
import httpStatus from 'http-status';
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World'
  });
});
app.use(authRoutes);
app.use(ordersRoutes);
app.use(transactionsRoutes);
app.use('/users', usersRoutes);

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);
app.use(limiter);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API started at http://localhost:${port}`);
});
