import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

function validateQuery(schema: z.ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.query);
    if (!validation.success) {
      res.status(400).json(validation.error.format());
      return;
    }
    next();
  };
}

function validateParams(schema: z.ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.params);
    if (!validation.success) {
      res.status(400).json(validation.error.format());
      return;
    }
    next();
  };
}

export { validateQuery, validateParams };
