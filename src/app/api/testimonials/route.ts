import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Testimonial from '@/lib/models/Testimonial';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  // GET: fetch all testimonials
  if (req.method === 'GET') {
    const testimonials = await Testimonial.find({});
    return res.status(200).json(testimonials);
  }

  // POST: add a new testimonial (admin only)
  if (req.method === 'POST') {
    const apiKey = req.headers['x-api-key'];
    console.log('Received API Key:', apiKey);
    console.log('Expected API Key:', process.env.ADMIN_API_KEY);
    console.log('Request body:', req.body);

    // Simple admin protection via header
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { clientName, role, quote, photoUrl } = req.body;

    if (!clientName || !role || !quote) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const newTestimonial = await Testimonial.create({
        clientName,
        role,
        quote,
        photoUrl,
      });

      return res.status(201).json(newTestimonial);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating testimonial', error });
    }
  }

  // Other methods not allowed
  return res.status(405).json({ message: 'Method Not Allowed' });
}
