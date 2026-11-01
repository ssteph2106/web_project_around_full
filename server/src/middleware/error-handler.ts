
import mongoose from 'mongoose';
import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, next) => {
  void next;
  
  let statusCode = 500;
  let message = 'Ha ocurrido un error en el servidor';

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'El ID proporcionado no es válido';
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Los datos proporcionados no son válidos';
  } else if (err instanceof Error) {
    const errorWithStatus = err as Error & { statusCode?: number };

    if (typeof errorWithStatus.statusCode === 'number') {
      statusCode = errorWithStatus.statusCode;
      message = errorWithStatus.message;
    }
  }

  res.status(statusCode).json({ message });
};

export default errorHandler;

