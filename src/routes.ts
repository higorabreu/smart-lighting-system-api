import express from 'express'
import { lampStateRegistersController } from './controllers/lampStateRegistersController'

const router = express.Router()

router.get('/lamp-on-time', lampStateRegistersController.getTotalOnTimeLast24Hours);
router.get('/registers', lampStateRegistersController.getAllRegisters);
router.get('/monthly-consumption', lampStateRegistersController.getMonthlyConsumption);

router.post('/register', lampStateRegistersController.saveState);


export { router }