import type { NextApiRequest, NextApiResponse } from 'next';
import { cardsData, CardItem } from '@/utils/carddata';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CardItem[]>,
) {
  setTimeout(() => {
    console.log("cardsData", cardsData)
    res.status(200).json(cardsData);
  }, 1000);
}
