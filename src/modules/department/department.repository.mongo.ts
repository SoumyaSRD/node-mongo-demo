import Department from "./department.model.js";
import type { IDepartmentRepository } from "./department.repository.interface.js";

export class MongoDepartmentRepository implements IDepartmentRepository {
  findAll() {
    return Department.find({});
  }

  findById(id: string) {
    return Department.findById(id);
  }

  async create(dep: unknown) {
    const doc = new (Department as any)(dep);
    return doc.save();
  }

  updateById(id: string, update: any) {
    return Department.updateOne({ _id: id }, { $set: update });
  }

  deleteById(id: string) {
    return Department.deleteOne({ _id: id });
  }
}

