import { Request, Response } from 'express';

export const submitOrder = (req: Request, res: Response) => {
  const order = req.body;
  console.log('Received order:', order);

  // For now, just respond with success
  res.status(200).json({ message: 'Order received', data: order });
};
