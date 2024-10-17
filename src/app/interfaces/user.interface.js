module.exports = class IUser {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.age = user.age;
    this.address = user.address;
  }
};
