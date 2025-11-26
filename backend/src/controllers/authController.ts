import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { loginSchema, signupSchema } from '../utils/validators';

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const validation = signupSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          error: 'Validation failed',
          details: validation.error.errors,
        });
      }

      const { email, password, name } = validation.data;
      const result = await authService.signup(email, password, name);

      res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      res.status(400).json({ error: message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validation = loginSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          error: 'Validation failed',
          details: validation.error.errors,
        });
      }

      const { email, password } = validation.data;
      const result = await authService.login(email, password);

      res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      res.status(401).json({ error: message });
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await authService.getUser(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get user';
      res.status(400).json({ error: message });
    }
  }

  async logout(req: Request, res: Response) {
    // Since we're using JWT, logout is handled on the client by removing the token
    res.status(200).json({ message: 'Logout successful' });
  }

  async updatePassword(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Old and new passwords are required' });
      }

      const result = await authService.updatePassword(req.user.id, oldPassword, newPassword);
      res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update password';
      res.status(400).json({ error: message });
    }
  }
}

export const authController = new AuthController();
