import type { RequestHandler } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getUsers: RequestHandler = async (_req, res) => {
  const users = await User.find({}).select('_id name about avatar');
  res.json(users);
};

const getUserById: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id)
  .select('_id name about avatar');

  if (!user) {
    throw Object.assign(new Error('Usuario no encontrado'), {
      statusCode: 404,
    });
  }

  res.json(user);
};

const createUser: RequestHandler = async (req, res) => {
  try {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password) {
    throw Object.assign(new Error('Email o contraseña no encontrados'), {
      statusCode: 400,
    });
  }
   if (typeof password !== 'string' || password.length < 8) {
    throw Object.assign(new Error('La contraseña debe tener al menos 8 caracteres'), {
      statusCode: 400,
    });
  }
    const user = await User.create({ name, about, avatar, email, password: await bcrypt.hash(password, 10) });
    res.status(201).json({ _id: user._id, name: user.name, about: user.about, avatar: user.avatar, email: user.email, });
   } catch (error: unknown) {
  if (
    error && typeof error === 'object' && 'code' in error &&
    error.code === 11000
  ) { 
    throw Object.assign(new Error('Este email ya está registrado'), {
      statusCode: 409,
    });
  }
  throw error;
}
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

   if (!email || !password) {
    throw Object.assign(new Error('Email o contraseña no encontrados'), {
      statusCode: 400,
    });
  }

  const user = await User.findOne( { email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw Object.assign(new Error('Email o contraseña incorrectos'), {
      statusCode: 401,
    });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET no está configurado');
  }

  const token = jwt.sign(
    { _id: user._id },
    jwtSecret,
    { expiresIn: '7d' },
  );

  res.json({
    token,
    user: {
     _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar, 
    },
  });
};

const getCurrentUser: RequestHandler = async (req, res) => {
  const user = await User.findById(req.user?._id).select('_id email name about avatar');

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
  ).select('_id email name about avatar');

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
  ).select('_id email name about avatar');

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
  login,
  getCurrentUser,
  updateUser,
  updateAvatar,
};

