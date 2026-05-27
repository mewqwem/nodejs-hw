import { HttpError } from 'http-errors';
import { isCelebrateError } from 'celebrate';

export const errorHandler = (err, req, res, next) => {
  console.error('Error Middleware:', err);

  if (isCelebrateError(err)) {
    const details = [];
    err.details.forEach((detail) => {
      details.push({
        message: detail.message,
        path: detail.path.join('.'),
      });
    });
    return res.status(400).json({
      message: 'Validation error',
      details,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }
  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
