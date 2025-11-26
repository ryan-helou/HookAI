import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateTokens } from '../utils/jwt';
import { ERROR_MESSAGES } from '../utils/constants';
import { PLANS } from '../types';

const prisma = new PrismaClient();

export class AuthService {
  async signup(email: string, password: string, name: string) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with default Free subscription
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        subscription: {
          create: {
            planId: 'free',
            status: 'active',
            currentUsage: 0,
            monthlyLimit: PLANS.free.monthlyLimit,
            renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          },
        },
      },
      include: {
        subscription: true,
      },
    });

    const { token, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const { token, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
      refreshToken,
      subscription: user.subscription,
    };
  }

  async getUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      subscription: user.subscription,
    };
  }

  async updatePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
  }
}

export const authService = new AuthService();
