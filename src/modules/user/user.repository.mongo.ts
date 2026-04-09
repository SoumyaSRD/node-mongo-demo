import User from "./user.model.js";
import { dynamicSearch } from "../../app/services/common.service.js";
import type { IUserRepository } from "./user.repository.interface.js";

export class MongoUserRepository implements IUserRepository {
  async findAll() {
    return User.find({});
  }

  async findById(id: string) {
    return User.findById(id);
  }

  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async findByEmailOrPhoneWithPassword({
    email,
    phone,
  }: {
    email?: string;
    phone?: string;
  }) {
    return User.findOne({
      $or: [{ phone }, { email }],
    })
      .select("+password")
      .exec();
  }

  async create(user: unknown) {
    const newUser = new (User as any)(user);
    await newUser.save();
    const { password, ...userWithoutPassword } = newUser.toObject() as any;
    return userWithoutPassword;
  }

  async updateById(id: string, update: any) {
    return User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string) {
    return User.findByIdAndDelete(id);
  }

  async aggregateDynamicSearch(searchParams: any, page?: number, limit?: number) {
    const lookUps = [
      {
        from: "department",
        localField: "departments",
        foreignField: "_id",
        as: "departments",
      },
    ];
    return dynamicSearch(User as any, searchParams, page, limit, {}, lookUps);
  }
}

