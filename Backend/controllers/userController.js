import * as userService from '../services/userService.js';
import AppError from '../models/errorModel.js';

export const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.createUser(email, password);
    res.status(201).json({ message: 'User created.', user: result });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to create user: ${error.message}`);
    }
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to fetch users: ${error.message}`);
    }
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to retrieve user: ${error.message}`);
    }
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const updated = await userService.updateUser(req.params.id, email, password);
    res.status(200).json({ message: 'User updated.', user: updated });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to update user: ${error.message}`);
    }
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted.' });
  } catch (error) {
    if (!(error instanceof AppError)) {
      error = new AppError(500, `Failed to delete user: ${error.message}`);
    }
    next(error);
  }
};