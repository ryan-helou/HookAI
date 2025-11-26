import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-min-32-chars';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '15m';
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export const generateTokens = (payload: JWTPayload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRY,
  });

  return { token, refreshToken };
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
