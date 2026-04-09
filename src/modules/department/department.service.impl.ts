import type { IDepartmentRepository } from "./department.repository.interface.js";
import type { IDepartmentService } from "./department.service.interface.js";

export class DepartmentServiceImpl implements IDepartmentService {
  constructor(private readonly repo: IDepartmentRepository) {}

  findDepartments() {
    return this.repo.findAll();
  }

  findDepartmentById(id: string) {
    return this.repo.findById(id);
  }

  saveDepartment(dep: unknown) {
    return this.repo.create(dep);
  }

  updateDepartment(dep: any) {
    return this.repo.updateById(dep._id, dep);
  }

  deleteDepartmentById(id: string) {
    return this.repo.deleteById(id);
  }
}

