import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

export const checkJwtToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    // TODO: Store user info in request

    next();
  });
};
