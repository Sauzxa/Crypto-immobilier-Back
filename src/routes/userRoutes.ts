import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  updateUserStatus,
  getTotalCount,
  getDoneCount,
  getPendingCount
} from '../controllers/userController';

const router = Router();

// POST /users - Create a new reservation
router.post('/', createUser);

// GET /users - Get all reservations
router.get('/', getAllUsers);

// PUT /users/:id/status - Update reservation status
router.put('/:id/status', updateUserStatus);

// GET /users/count - Get total count of reservations
router.get('/count', getTotalCount);

// GET /users/count/done - Get count of completed reservations
router.get('/count/done', getDoneCount);

// GET /users/count/pending - Get count of pending reservations
router.get('/count/pending', getPendingCount);

export default router;
