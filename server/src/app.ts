import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import errorHandler from './middleware/error-handler.js';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use((req, _res, next) => {
  req.user = { _id: '6ad6ec5c1c96d4b9c6fadf47' };
  next();
});


app.use('/', router);


app.use((_req, _res, next) => {
  next(
    Object.assign(new Error('Recurso solicitado no encontrado'), {
      statusCode: 404,
    }),
  );
});

app.use(errorHandler);

mongoose
  .connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => {
    console.log('Conexión a MongoDB establecida');

 app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })

  .catch((error: unknown) => {
    console.error('Error al conectar con MongoDB:', error);
  });