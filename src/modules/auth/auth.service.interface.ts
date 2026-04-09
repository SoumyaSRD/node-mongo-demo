export interface IAuthService {
  createUser(user: unknown): Promise<any>;
  findUserWithPassword(params: { email?: string; phone?: string }): Promise<any | null>;
}

