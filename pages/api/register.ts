// pages/api/auth/register.ts
import { hash } from 'bcryptjs';  // or use another password hashing library
import prisma from '../../lib/prisma';  // Assuming prisma is initialized in this file

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the email is already taken
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,  // Ensure this matches one of the valid Role values
      },
    });

    return res.status(201).json({ message: 'User created successfully', user });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
