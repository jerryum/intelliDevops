import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import DB from '@/database';
import { HttpException } from '@/common/exceptions/HttpException';

import config from 'config';
import { IDataStoredInToken, IRequestWithUser } from '@/common/interfaces/party.interface';

/**
 * Middleware to be used to authenticate a particular request.
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('X_AUTH_TOKEN');
    //console.log(token); // Get the token from 'x-auth-token' header
    if (!token) {
      return res.status(400).json({ msg: 'Authorization denied. ' });
    }

    if (token != config.auth.x_auth_token) {
      return res.status(401).json({ msg: 'Invalid token. ' });
    }

    next();
  } catch (error) {
    console.log(error);
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
