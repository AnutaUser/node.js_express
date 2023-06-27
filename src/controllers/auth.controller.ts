import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../errors';
import { authService } from '../services';
import { ITokensPair } from '../types';

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const user = await authService.register(req.body);
      return res.status(201).json(user);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokensPair>> {
    try {
      const tokensPair = await authService.login(req.body, req.res.locals.user);
      return res.status(201).json(tokensPair);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { _id } = req.res.locals.tokenInfo;
      const { oldPassword, newPassword } = req.body;

      await authService.changePassword(oldPassword, newPassword, _id);

      return res.sendStatus(201);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokensPair>> {
    try {
      const tokensPair = await authService.refresh(
        req.res.locals.oldTokensPair,
        req.res.locals.tokenPayload
      );

      return res.status(201).json(tokensPair);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { email } = req.body;
      const { user } = req.res.locals;

      await authService.forgotPassword(user._id, email);

      return res.sendStatus(200);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async setForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { password } = req.body;
      const { tokenPayload } = req.res.locals;

      await authService.setForgotPassword(password, tokenPayload);

      return res.sendStatus(201);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async activate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      // const activateToken = await tokenService.generateActivateToken({
      //   _id: req.body._id,
      //   username: req.body.username,
      // });
      return res.status(201);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }
}

export const authController = new AuthController();
