import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const qrCode = 'https://test.com'; 
  res.status(200).json({ qrCode });
}