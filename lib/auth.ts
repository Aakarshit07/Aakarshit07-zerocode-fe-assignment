import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { User } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-for-development';

// Mock user database (in production, use a real database)
const users: User[] = [];
const userPasswords: Record<string, string> = {};

// Initialize demo user synchronously
try {
  const demoUser: User = {
    id: 'demo-user-1',
    email: 'demo@zerocode.com',
    name: 'Demo User',
    createdAt: new Date(),
  };

  // Add demo user immediately
  users.push(demoUser);
  userPasswords[demoUser.email] = bcrypt.hashSync('demo123', 10);

  console.log('✅ Demo user initialized successfully:', demoUser.email);
  console.log(
    '✅ Available users:',
    users.map((u) => u.email)
  );
} catch (error) {
  console.error('❌ Error initializing demo user:', error);
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    console.log('🔍 Attempting to authenticate:', email);
    console.log(
      '🔍 Available users:',
      users.map((u) => u.email)
    );

    const user = users.find((u) => u.email === email);
    if (!user) {
      console.log('❌ User not found:', email);
      return null;
    }

    const hashedPassword = userPasswords[email];
    if (!hashedPassword) {
      console.log('❌ No password found for user:', email);
      return null;
    }

    console.log('🔍 Comparing passwords for:', email);
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log('✅ Password valid:', isValid);

    return isValid ? user : null;
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return null;
  }
}

export async function registerUser(email: string, password: string, name: string): Promise<User> {
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    createdAt: new Date(),
  };

  users.push(newUser);
  userPasswords[email] = hashedPassword;

  return newUser;
}

export function generateToken(user: User): string {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export function getUserById(id: string): User | null {
  return users.find((u) => u.id === id) || null;
}
