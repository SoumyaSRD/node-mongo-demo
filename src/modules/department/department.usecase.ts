import type { IDepartmentService } from "./department.service.interface.js";
import { MongoDepartmentRepository } from "./department.repository.mongo.js";
import { DepartmentServiceImpl } from "./department.service.impl.js";

const departmentService: IDepartmentService = new DepartmentServiceImpl(
  new MongoDepartmentRepository()
);

export function findDepartments() {
  return departmentService.findDepartments();
}

export function findDepartmentById(id: string) {
  return departmentService.findDepartmentById(id);
}

export function saveDepartment(dep: unknown) {
  return departmentService.saveDepartment(dep);
}

export function updateDepartment(dep: any) {
  return departmentService.updateDepartment(dep);
}

export function deleteDepartmentById(id: string) {
  return departmentService.deleteDepartmentById(id);
}

