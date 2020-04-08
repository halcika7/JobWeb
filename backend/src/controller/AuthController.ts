import { Request, Response } from 'express';
import { User } from '../model/User';
import {
  createNewdBRow,
  isEmpty,
  transformErrors,
} from '../util/transformErrors';
import { BaseController } from './BaseController';

class AuthController extends BaseController {
  constructor() {
    super(AuthController);
  }

  async register(req: Request, res: Response) {
    try {
      const { userData } = req.body;
      // userData.phone = '+387'+userData.phone
      const user = createNewdBRow(User, userData);

      const errors = await transformErrors(user);

      if (!isEmpty(errors)) {
        return res.status(400).json({ errors });
      }

      return res.status(200).json({ message: 'ok' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async login(req: Request, res: Response) {
    return null;
  }

  async logout(req: Request, res: Response) {
    return null;
  }

  async refreshToken(req: Request, res: Response) {
    return null;
  }

  async forgotPassword(req: Request, res: Response) {
    return null;
  }

  async resetPassword(req: Request, res: Response) {
    return null;
  }

  async activateAccount(req: Request, res: Response) {
    return null;
  }

  async reactivateAccount(req: Request, res: Response) {
    return null;
  }
}

export const AuthControllerinstance = new AuthController();
