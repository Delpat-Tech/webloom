import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Lead from '@/lib/models/Lead';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const leads = await Lead.find({});
    return res.status(200).json(leads);
  }

  if (req.method === 'POST') {
    try {
      const { name, email, company, message, page } = req.body;

      if (!name || !email || !page) {
        return res.status(400).json({ message: 'Missing required fields: name, email, or page' });
      }

      const lead = await Lead.create({
        name,
        email,
        company,
        message,
        page,
        dateSubmitted: new Date(),
      });

      return res.status(201).json(lead);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to create lead', error: err });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

