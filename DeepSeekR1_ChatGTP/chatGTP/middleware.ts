import { Request, Response, NextFunction } from 'express';

export function logRequest(req: Request, res: Response, next: NextFunction): void {
  console.log('Before Request');
  next();
  console.log('After Request');
}
