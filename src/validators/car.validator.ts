import Joi from 'joi';

import { regexConstant } from '../constants';

export class CarValidator {
  private static brand = Joi.string()
    .regex(regexConstant.CAR_BRAND)
    .lowercase()
    .trim();
  private static year = Joi.number().min(1990).max(new Date().getFullYear());
  private static price = Joi.number().min(0).max(1000000);
  private static description = Joi.string().min(0).max(50000);
  static photo = Joi.string();

  static create = Joi.object({
    brand: this.brand.required(),
    year: this.year.required(),
    price: this.price.required(),
    description: this.description,
    photo: this.photo,
  });

  static update = Joi.object({
    brand: this.brand,
    year: this.year,
    price: this.price,
    description: this.description,
    photo: this.photo,
  });
}
