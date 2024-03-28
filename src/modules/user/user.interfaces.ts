import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: number;
  profession?: string;
  organisation?: string;
  designation?: string;
  bed?: string;
  occupation?: Date;
  duration?: Date;
  budget?: string;
  reference?: string;
  location?: string;
  comments?: string;
  role: string;
  isEmailVerified: boolean;
  kycId?: string;
  additionalServices?: string;
  workAddress?: string;
  profissionalId?: string;
  uploadAdharurl?: string;
  institutionIDurl?: string;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<IUser>;

export type NewRegisteredUser = Omit<IUser, 'role' | 'isEmailVerified'>;

export type NewCreatedUser = Omit<IUser, 'isEmailVerified'>;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;
}
