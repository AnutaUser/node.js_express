import { UploadedFile } from 'express-fileupload';
import { Types } from 'mongoose';

import { configs } from '../configs';
import { ApiError } from '../errors';
import { Car } from '../models';
import { carRepository } from '../repositories';
import { ICar, IPaginationResponse, IQuery } from '../types';
import { s3Service } from './s3.service';

class CarService {
  public async findAll(query: IQuery): Promise<IPaginationResponse<ICar>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 10,
        sortedBy = 'createdAt',
        ...searchObject
      } = queryObj;

      const skip = +limit * (+page - 1);

      const [cars, totalCount] = await Promise.all([
        Car.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
        Car.count(),
      ]);

      return {
        page: +page,
        perPage: +limit,
        itemCount: totalCount,
        itemFound: cars.length,
        data: cars,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(body: ICar, userId: string): Promise<ICar> {
    try {
      return await Car.create({ ...body, _user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(carId: string, userId: string): Promise<ICar> {
    return await carRepository.getByIdAndUser(carId, userId);
  }

  public async update(carId: string, data: Partial<ICar>): Promise<ICar> {
    return await Car.findByIdAndUpdate(carId, data, {
      returnDocument: 'after',
    });
  }

  public async delete(carId: string): Promise<void> {
    try {
      return await Car.findByIdAndRemove(carId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async addPhoto(carId: string, photo: UploadedFile): Promise<ICar> {
    try {
      const car = await this.getByIdOrThrow(carId);

      if (car.photo) {
        await s3Service.deleteFile(car.photo, configs.AWS_S3_NAME_PHOTO);
      }

      const carPhoto = await s3Service.uploadFile(photo, 'car', carId);

      return await Car.findByIdAndUpdate(
        carId,
        { $set: { photo: carPhoto } },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deletePhoto(carId: string): Promise<ICar> {
    try {
      const car = await this.getByIdOrThrow(carId);

      if (!car.photo) {
        return car;
      }

      await s3Service.deleteFile(car.photo, configs.AWS_S3_NAME_PHOTO);

      return await Car.findByIdAndUpdate(
        carId,
        { $unset: { photo: car.photo } },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  private async getByIdOrThrow(carId: string): Promise<ICar> {
    const car = await Car.findById(carId);

    if (!car) {
      throw new ApiError('Car not found', 422);
    }
    return car;
  }
}

export const carService = new CarService();
