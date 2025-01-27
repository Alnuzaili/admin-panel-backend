
import jwt, { SignOptions } from 'jsonwebtoken';

type TPayload = { id: string };

export const generateToken = (payload: TPayload, expiresIn: string | number): string => {
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string): TPayload => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.verify(token, secret) as TPayload;
};
