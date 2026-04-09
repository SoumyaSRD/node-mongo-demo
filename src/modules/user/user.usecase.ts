import type { IUserService } from "./user.service.interface.js";
import { MongoUserRepository } from "./user.repository.mongo.js";
import { UserServiceImpl } from "./user.service.impl.js";

// Interface/UseCase layer: the only entry point controllers should call.
const userService: IUserService = new UserServiceImpl(new MongoUserRepository());

export function findAllUser() {
  return userService.findAllUser();
}

export function findUserById(id: string) {
  return userService.findUserById(id);
}

export function updateUser(user: any) {
  return userService.updateUser(user);
}

export function deleteUser(id: string) {
  return userService.deleteUser(id);
}

export function filterUser(searchParams: any, page?: number, limit?: number) {
  return userService.filterUser(searchParams, page, limit);
}

