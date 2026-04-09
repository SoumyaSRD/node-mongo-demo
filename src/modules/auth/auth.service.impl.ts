import type { IUserRepository } from "../user/user.repository.interface.js";
import type { IAuthService } from "./auth.service.interface.js";

export class AuthServiceImpl implements IAuthService {
  constructor(private readonly userRepo: IUserRepository) {}

  findUserWithPassword(params: { email?: string; phone?: string }) {
    return this.userRepo.findByEmailOrPhoneWithPassword(params);
  }

  createUser(user: unknown) {
    return this.userRepo.create(user);
  }
}

