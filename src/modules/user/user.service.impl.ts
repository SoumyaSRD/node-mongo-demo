import type { IUserRepository } from "./user.repository.interface.js";
import type { IUserService } from "./user.service.interface.js";

export class UserServiceImpl implements IUserService {
  constructor(private readonly repo: IUserRepository) {}

  findAllUser() {
    return this.repo.findAll();
  }

  findUserById(id: string) {
    return this.repo.findById(id);
  }

  updateUser(user: any) {
    return this.repo.updateById(user._id, user);
  }

  deleteUser(id: string) {
    return this.repo.deleteById(id);
  }

  filterUser(searchParams: any, page?: number, limit?: number) {
    return this.repo.aggregateDynamicSearch(searchParams, page, limit);
  }
}

