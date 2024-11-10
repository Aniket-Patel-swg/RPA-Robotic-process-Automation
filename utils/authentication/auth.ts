// src/utils/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Generate a JWT token for a given user ID.
 * @param userId - The ID of the user.
 * @returns The generated JWT token.
 */
export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

/**
 * Verify a JWT token and extract the user ID.
 * @param token - The JWT token to verify.
 * @returns The decoded token if valid, or throws an error.
 */
export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
