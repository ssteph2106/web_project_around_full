import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const auth: RequestHandler = (req, _res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(
      Object.assign(new Error('Se requiere autorización'), {
        statusCode: 401,
      }),
    );
    return;
  }

  const token = authorization.replace('Bearer ', '');
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    next(new Error('JWT_SECRET no está configurado'));
    return;
  }

  try {
    const payload = jwt.verify(token, jwtSecret);

    if (
      typeof payload === 'string' ||
      typeof payload._id !== 'string'
    ) {
      throw new Error('Token inválido');
    }

    req.user = { _id: payload._id };
    next();
  } catch {
    next(
      Object.assign(new Error('Token inválido o expirado'), {
        statusCode: 401,
      }),
    );
  }
};

export default auth;
