import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { ApiError } from '../errors';
import { carMapper } from '../mapers/car.mapper';
import { carService } from '../services';
import { ICar, IPaginationResponse, IQuery, ITokenPayload } from '../types';

class CarController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IPaginationResponse<ICar>>> {
    try {
      const cars = await carService.findAll(req.query as unknown as IQuery);

      return res.status(200).json(cars);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { _id } = req.res.locals.tokenInfo as ITokenPayload;

      const car = carService.create(req.body, _id);

      return res.status(200).json(car);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { car, tokenInfo } = req.res.locals;

      const carWithUser = await carService.getById(car._id, tokenInfo._id);

      return res.status(200).json(carWithUser);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;

      const updateCar = await carService.update(carId, req.body);

      return res.status(200).json(updateCar);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { carId } = req.params;

      await carService.delete(carId);

      return res.sendStatus(204);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async addPhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;

      const photo = req.files.photo as UploadedFile;

      const car = await carService.addPhoto(carId, photo);

      const carWithPhoto = carMapper.carForResponse(car);

      return res.status(201).json(carWithPhoto);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async deletePhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;

      const car = await carService.deletePhoto(carId);
      const carWithoutPhoto = carMapper.carForResponse(car);

      return res.status(200).json(carWithoutPhoto);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }
}

export const carController = new CarController();
