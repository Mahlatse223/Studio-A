// pages/api/ticket.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const tickets = await prisma.ticket.findMany({
        include: {
          resident: {
            select: {
              name: true,
              apartmentNumber: true,
            },
          },
          assignedTo: {
            select: {
              name: true,
            },
          },
        },
      });
      return res.status(200).json(tickets);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching tickets:', error.message);
      } else {
        console.error('Unknown error occurred while fetching tickets.');
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}