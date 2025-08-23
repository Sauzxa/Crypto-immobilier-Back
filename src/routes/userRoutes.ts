import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  updateUserStatus,
  getTotalCount,
  getDoneCount,
  getPendingCount
} from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = Router();

// Apply JWT protection to all routes
router.use(protect);

// POST /users - Create a new reservation (protected)
router.post('/', createUser);

// GET /users - Get all reservations (protected)
router.get('/', getAllUsers);

// PUT /users/:id/status - Update reservation status (protected)
router.put('/:id/status', updateUserStatus);

// GET /users/count - Get total count of reservations (protected)
router.get('/count', getTotalCount);

// GET /users/count/done - Get count of completed reservations (protected)
router.get('/count/done', getDoneCount);

// GET /users/count/pending - Get count of pending reservations (protected)
router.get('/count/pending', getPendingCount);

export default router;
