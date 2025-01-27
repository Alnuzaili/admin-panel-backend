import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authorRouter from './routes/author.router';
import bookRouter from './routes/book.router';
import authRouter from './routes/auth.router';
import profileRouter from './routes/profile.router';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import cookieParser from 'cookie-parser';
import requestLogger from './middleware/requestLogger';
import { pino } from "pino";

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './utils/swaggerOptions';

dotenv.config();

export const logger = pino({ name: "server start" });
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

// CORS Middleware
const corsOptions = {
  origin: process.env.APP_ENV == 'development' ? '*' : process.env.ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// JSON Middleware & Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// Request Logger
app.use(requestLogger)

// Swagger setup
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Main Routes
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);

// Not Found Middleware
app.use(notFoundHandler);

// Error Handling Middleware
app.use(errorHandler);


app.listen(PORT, () => {
  logger.info(`Listening on PORT ${PORT}`);
});
