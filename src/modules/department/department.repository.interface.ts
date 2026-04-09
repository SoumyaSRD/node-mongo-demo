export interface IDepartmentRepository {
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  create(dep: unknown): Promise<any>;
  updateById(id: string, update: unknown): Promise<any>;
  deleteById(id: string): Promise<any>;
}

