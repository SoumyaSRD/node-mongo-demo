import type { IAuthService } from "./auth.service.interface.js";
import { AuthServiceImpl } from "./auth.service.impl.js";
import { MongoUserRepository } from "../user/user.repository.mongo.js";

const authService: IAuthService = new AuthServiceImpl(new MongoUserRepository());

export function findUserWithPassword(params: { email?: string; phone?: string }) {
  return authService.findUserWithPassword(params);
}

export function createUser(user: unknown) {
  return authService.createUser(user);
}

