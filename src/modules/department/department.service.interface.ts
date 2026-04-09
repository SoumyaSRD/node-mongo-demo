export interface IDepartmentService {
  findDepartments(): Promise<any[]>;
  findDepartmentById(id: string): Promise<any | null>;
  saveDepartment(dep: unknown): Promise<any>;
  updateDepartment(dep: any): Promise<any>;
  deleteDepartmentById(id: string): Promise<any>;
}

