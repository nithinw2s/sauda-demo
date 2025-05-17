import type { NextApiRequest, NextApiResponse } from 'next';
import { filterFields } from '@/utils/const';
import { FilterField } from '@/utils/typos';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FilterField[]>,
) {
  setTimeout(() => {
    res.status(200).json(filterFields);
  }, 3000);
}