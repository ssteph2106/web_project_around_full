
import type { RequestHandler } from 'express';
import User from '../models/user.js';

const getUsers: RequestHandler = async (_req, res) => {
  const users = await User.find({});
  res.json(users);
};

const getUserById: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw Object.assign(new Error('Usuario no encontrado'), {
      statusCode: 404,
    });
  }

  res.json(user);
};

const createUser: RequestHandler = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

const getCurrentUser: RequestHandler = async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw Object.assign(new Error('Usuario no encontrado'), {
      statusCode: 404,
    });
  }

  res.json(user);
};

const updateUser: RequestHandler = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw Object.assign(new Error('Usuario no encontrado'), {
      statusCode: 404,
    });
  }

  res.json(user);
};

const updateAvatar: RequestHandler = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw Object.assign(new Error('Usuario no encontrado'), {
      statusCode: 404,
    });
  }

  res.json(user);
};

export {
  getUsers,
  getUserById,
  createUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
};

