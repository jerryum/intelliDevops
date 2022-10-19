import { NextFunction, Request, Response } from 'express';

import DB from '@/database';
import { HttpException } from '@/common/exceptions/HttpException';
import config from 'config';

/**
 * Middleware to be used to authenticate a particular request.
 * @param  {} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
const systemAuthMiddleware = async (req, res: Response, next: NextFunction) => {
  try {
    if (req.systemId) {
      return next();
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default systemAuthMiddleware;
