import type { RequestHandler } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card.js';

const getCards: RequestHandler = async (req, res) => {
  const cards = await Card.find({});

  const cardsWithIsLiked = cards.map((card) => {
    const isLiked = card.likes.some(
      (userId) => userId.toString() === req.user?._id,
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

  if (!mongoose.isValidObjectId(id)) {
    throw Object.assign(new Error('El ID de la tarjeta no es válido'), {
      statusCode: 400,
    });
  }

  const card = await Card.findByIdAndDelete(id);

  if (!card) {
    throw Object.assign(new Error('Tarjeta no encontrada'), {
      statusCode: 404,
    });
  }

  res.json(card);
};

const likeCard: RequestHandler = async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user?._id } },
    { new: true, runValidators: true },
  );

  if (!card) {
    throw Object.assign(new Error('Tarjeta no encontrada'), {
      statusCode: 404,
    });
  }

  const isLiked = card.likes.some(
    (userId) => userId.toString() === req.user?._id,
  );

  res.json({
    ...card.toObject(),
    isLiked,
  });
};

const unlikeCard: RequestHandler = async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user?._id } },
    { new: true, runValidators: true },
  );

  if (!card) {
    throw Object.assign(new Error('Tarjeta no encontrada'), {
      statusCode: 404,
    });
  }

  const isLiked = card.likes.some(
    (userId) => userId.toString() === req.user?._id,
  );

  res.json({
    ...card.toObject(),
    isLiked,
  });
};

export { getCards, createCard, deleteCard, likeCard, unlikeCard };

