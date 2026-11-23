import type { RequestHandler } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card.js';

const getCards: RequestHandler = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw Object.assign(new Error('Usuario no autorizado'), {
      statusCode: 401,
    });
  }

  const cards = await Card.find({
    owner: new mongoose.Types.ObjectId(userId),
  }).sort({ createdAt: -1 });

  const cardsWithIsLiked = cards.map((card) => {
    const isLiked = card.likes.some(
      (likedUserId) => likedUserId.toString() === userId,
    );

    return {
      ...card.toObject(),
      isLiked,
    };
  });

  res.json(cardsWithIsLiked);
};


const createCard: RequestHandler = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw Object.assign(new Error('Usuario no autorizado'), {
      statusCode: 401,
    });
  }

  const card = await Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: new mongoose.Types.ObjectId(userId),
  });

  const isLiked = card.likes.some(
    (likedUserId: mongoose.Types.ObjectId) =>
      likedUserId.toString() === userId,
  );

  res.status(201).json({
    ...card.toObject(),
    isLiked,
  });
};


const deleteCard: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!mongoose.isValidObjectId(id)) {
    throw Object.assign(new Error('El ID de la tarjeta no es válido'), {
      statusCode: 400,
    });
  }

  const card = await Card.findById(id);

  if (!card) {
    throw Object.assign(new Error('Tarjeta no encontrada'), {
      statusCode: 404,
    });
  }

  if (card.owner.toString() !== userId) {
    throw Object.assign(new Error('No tienes permiso para eliminar esta tarjeta'), {
      statusCode: 403,
    });
  }

  await card.deleteOne();

  res.json(card);
};

const likeCard: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!mongoose.isValidObjectId(id)) {
    throw Object.assign(new Error('El ID de la tarjeta no es válido'), {
      statusCode: 400,
    });
  }

  if (!userId) {
    throw Object.assign(new Error('Usuario no autorizado'), {
      statusCode: 401,
    });
  }

  const card = await Card.findById(id);

  if (!card) {
    throw Object.assign(new Error('Tarjeta no encontrada'), {
      statusCode: 404,
    });
  }

  if (card.owner.toString() !== userId) {
    throw Object.assign(new Error('No tienes permiso para modificar esta tarjeta'), {
      statusCode: 403,
    });
  }

const alreadyLiked = card.likes.some(
  (likedUserId) => likedUserId.toString() === userId,
);

if (!alreadyLiked) {
  card.likes.push(new mongoose.Types.ObjectId(userId));
}

  await card.save();

  const isLiked = card.likes.some(
    (likedUserId) => likedUserId.toString() === userId,
  );

  res.json({
    ...card.toObject(),
    isLiked,
  });
};

const unlikeCard: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!mongoose.isValidObjectId(id)) {
    throw Object.assign(new Error('El ID de la tarjeta no es válido'), {
      statusCode: 400,
    });
  }

  if (!userId) {
    throw Object.assign(new Error('Usuario no autorizado'), {
      statusCode: 401,
    });
  }

  const card = await Card.findById(id);

  if (!card) {
    throw Object.assign(new Error('Tarjeta no encontrada'), {
      statusCode: 404,
    });
  }

  if (card.owner.toString() !== userId) {
    throw Object.assign(new Error('No tienes permiso para modificar esta tarjeta'), {
      statusCode: 403,
    });
  }

  card.likes = card.likes.filter(
  (likedUserId) => likedUserId.toString() !== userId,
  );

  await card.save();

  const isLiked = card.likes.some(
    (likedUserId) => likedUserId.toString() === userId,
  );

  res.json({
    ...card.toObject(),
    isLiked,
  });
};

export { getCards, createCard, deleteCard, likeCard, unlikeCard };

