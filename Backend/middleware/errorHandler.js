// middleware/errorHandler.js
export default function errorHandler(err, req, res, next) {
  const statusCode = err.code || 500;
  const message = err.message || 'Internal Server Error';

  // Optionally log the error stack in dev
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({ error: message });
}