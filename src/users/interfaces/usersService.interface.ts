import { User } from '../schemas/user.schema';

export interface CreateUserParams {
  user: User;
}

export interface FindOneUserParams {
  id?: string;
  providerId?: string;
}
