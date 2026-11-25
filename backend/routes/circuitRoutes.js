import { Router } from 'express';
import { CircuitController } from '../controllers/circuitController.js';

const router = Router();

router.get('/', CircuitController.getAll);
router.get('/:id', CircuitController.getById);
router.post('/', CircuitController.create);
router.put('/:id', CircuitController.update);
router.delete('/:id', CircuitController.remove);

export default router;
