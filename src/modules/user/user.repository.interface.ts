export interface IUserRepository {
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  findByEmail(email: string): Promise<any | null>;
  findByEmailOrPhoneWithPassword(params: {
    email?: string;
    phone?: string;
  }): Promise<any | null>;
  create(user: unknown): Promise<any>;
  updateById(id: string, update: unknown): Promise<any | null>;
  deleteById(id: string): Promise<any | null>;
  aggregateDynamicSearch(
    searchParams: any,
    page?: number,
    limit?: number
  ): Promise<{ data: any[]; totalCount: number }>;
}

