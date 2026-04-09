export interface IUserService {
  findAllUser(): Promise<any[]>;
  findUserById(id: string): Promise<any | null>;
  updateUser(user: any): Promise<any | null>;
  deleteUser(id: string): Promise<any | null>;
  filterUser(
    searchParams: any,
    page?: number,
    limit?: number
  ): Promise<{ data: any[]; totalCount: number }>;
}

