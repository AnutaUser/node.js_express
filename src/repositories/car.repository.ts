import { Types } from 'mongoose';

import { carMapper } from '../mapers/car.mapper';
import { Car } from '../models';
import { ICar } from '../types';

class CarRepository {
  public async getByIdAndUser(
    carId: string,
    userId: string
  ): Promise<ICar | any> {
    // return await Car.findById(carId).populate('_user');

    const result = await Car.aggregate([
      {
        $match: {
          _id: carId,
          _user: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_user',
          foreignField: '_id',
          as: '_user',
        },
      },
      {
        $unwind: {
          path: '$_user',
        },
      },
    ]);

    return carMapper.carWithUserForResponse(result[0], result[0]._user);
  }
}

export const carRepository = new CarRepository();
