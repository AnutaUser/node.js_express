import { Router } from 'express';

import { carController } from '../controllers';
import {
  authMiddleware,
  carMiddleware,
  commonMiddleware,
  fileMiddleware,
} from '../middlewares';
import { CarValidator } from '../validators';

const router = Router();

router.get('/', carController.findAll);
router.post(
  '/',
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.create
);

router.get(
  '/:carId',
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid('carId'),
  carMiddleware.getByIdOrThrow,
  carController.getById
);

router.put(
  '/:carId',
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid('carId'),
  commonMiddleware.isBodyValid(CarValidator.update),
  carMiddleware.getByIdOrThrow,
  carController.update
);

router.delete(
  '/:carId',
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid('carId'),
  carController.delete
);

router.post(
  '/:carId/photo',
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid('carId'),
  fileMiddleware.isPhotoValid,
  carController.addPhoto
);

router.delete(
  '/:carId/photo',
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid('carId'),
  carController.deletePhoto
);

export const carRouter = router;
