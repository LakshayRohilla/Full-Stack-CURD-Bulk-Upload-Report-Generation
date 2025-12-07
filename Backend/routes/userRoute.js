import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.route('/')
  .post(userController.createUser)
  .get(userController.getAllUsers);

router.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;