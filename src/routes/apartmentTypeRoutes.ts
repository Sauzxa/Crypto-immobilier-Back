import { Router } from 'express';
import {
  createApartmentType,
  getAllApartmentTypes,
  getApartmentTypeById,
  updateApartmentType,
  deleteApartmentType
} from '../controllers/apartmentTypeController';
import { protect } from '../middleware/auth';

const router = Router();

// Apply JWT protection to all apartment type routes
router.use(protect);

// POST /apartment-types - Create a new apartment type (protected)
router.post('/', createApartmentType);

// GET /apartment-types - Get all apartment types (protected)
router.get('/', getAllApartmentTypes);

// GET /apartment-types/:id - Get apartment type by ID (protected)
router.get('/:id', getApartmentTypeById);

// PUT /apartment-types/:id - Update apartment type (protected)
router.put('/:id', updateApartmentType);

// DELETE /apartment-types/:id - Delete apartment type (protected)
router.delete('/:id', deleteApartmentType);

export default router;
