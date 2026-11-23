import { Router } from 'express';
import {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} from '../controllers/users.js';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);
usersRouter.get('/:id', getUserById);

export { usersRouter };

