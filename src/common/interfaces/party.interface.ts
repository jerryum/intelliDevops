import { Request } from 'express';

export interface IRequestWithUser extends Request {
    userKey: number;
    customerAccountKey: number;
  }

  export interface IDataStoredInToken {
    userKey: number;
  }
  