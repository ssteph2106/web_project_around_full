import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import errorHandler from './middleware/error-handler.js';
import cors from 'cors';
import { createUser, login } from './controllers/users.js';
import auth from './middleware/auth.js';
import { rateLimit } from 'express-rate-limit';

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
    message: 'Demasiados intentos de registro. Inténtalo más tarde.',  
    });
  },
});

const signinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
    message: 'Demasiados intentos de inicio de sesión. Inténtalo más tarde.', 
    });
  },
});

const PORT = Number(process.env.PORT) || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(cors({ origin: CLIENT_ORIGIN }));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.post('/signup', signupLimiter, createUser);
app.post('/signin', signinLimiter, login);

app.use(auth);

app.use('/', router);


app.use((_req, _res, next) => {
  next(
    Object.assign(new Error('Recurso solicitado no encontrado'), {
      statusCode: 404,
    }),
  );
});

app.use(errorHandler);

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI no está configurado');
}

mongoose
  .connect(MONGODB_URI, {
    maxPoolSize: 10,
  })
  .then(() => {
    console.log('Conexión a MongoDB establecida');

 app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })

  .catch((error: unknown) => {
    console.error('Error al conectar con MongoDB:', error);
  });