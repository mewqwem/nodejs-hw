import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';

import { errors } from 'celebrate';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
  }),
);
app.use(cors());
app.use(cookieParser());

//! routes
app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);

//! celebrate errors handler
app.use(errors());

//! 404
app.use(notFoundHandler);

//! error
app.use(errorHandler);

//! connect to DB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
