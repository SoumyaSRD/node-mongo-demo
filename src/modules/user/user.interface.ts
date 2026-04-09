export type UserType = "USER" | "ADMIN" | string;

export class IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  age?: number;
  address?: string;
  type: UserType;
  departments?: unknown;

  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.age = user.age;
    this.address = user.address;
    this.type = user.type || "USER";
    this.departments = user.departments;
  }
}

