import bcrypt from 'bcrypt';
import AppError from '../models/errorModel.js';
import User from '../models/userModel.js';

const SALT_ROUNDS = 10;

export const createUser = async (email, password) => {
  if (!email || !password) {
    throw new AppError(400, 'Email and password are required.');
  }

  const exists = await User.findOne({ where: { email } });
  if (exists) {
    throw new AppError(400, 'Email already in use.');
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ email, password: hashed });
  return { id: user.id, email: user.email };
};

export const getAllUsers = async () => {
  const users = await User.findAll({ attributes: ['id', 'email'], order: [['id','ASC']] });
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: ['id','email'] });
  if (!user) throw new AppError(404, 'User not found.');
  return user;
};

export const updateUser = async (id, email, password) => {
  const user = await User.findByPk(id);
  if (!user) throw new AppError(404, 'User not found.');

  if (email && email !== user.email) {
    const conflict = await User.findOne({ where: { email } });
    if (conflict) throw new AppError(400, 'Email already in use.');
    user.email = email;
  }

  if (password) {
    user.password = await bcrypt.hash(password, SALT_ROUNDS);
  }

  await user.save();
  return { id: user.id, email: user.email };
};

export const deleteUser = async (id) => {
  const count = await User.destroy({ where: { id } });
  if (count === 0) throw new AppError(404, 'User not found.');
  return;
};