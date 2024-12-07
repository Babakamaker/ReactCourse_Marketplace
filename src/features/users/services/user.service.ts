import { GenericAbortSignal } from "axios";
import { HttpClient } from "../../../utils/http/HttpClient";

interface PaginatedResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface PaginatedUserResponse extends PaginatedResponse {
  users: User[];
}

type CreateUserRequest = Omit<User, "id">;
type UpdateUserRequest = Partial<CreateUserRequest>;
type DeleteUserResponse = User & {
  isDeleted: boolean;
  deletedOn: Date | string;
};

export class UserService {
  private httpClient: HttpClient;

  constructor(signal?: GenericAbortSignal) {
    this.httpClient = new HttpClient({
      baseURL: "https://dummyjson.com/users",
      signal,
    });
  }

  /** Get all users with optional pagination */
  public async getAllUsers(limit: number = 30, skip: number = 0) {
    return await this.httpClient.get<PaginatedUserResponse>(
      `?limit=${limit}&skip=${skip}`
    );
  }

  /** Get a single user by ID */
  public async getUserById(id: number) {
    return await this.httpClient.get<User>(`/${id}`);
  }

  /** Search users by query */
  public async searchUsers(query: string) {
    return await this.httpClient.get<PaginatedUserResponse>(`/search?q=${query}`);
  }

  /** Add a new user */
  public async addUser(user: CreateUserRequest) {
    return await this.httpClient.post<User, CreateUserRequest>("/add", user);
  }

  /** Update an existing user */
  public async updateUser(id: number, user: UpdateUserRequest) {
    return await this.httpClient.put<User, UpdateUserRequest>(`/${id}`, user);
  }

  /** Delete a user by ID */
  public async deleteUser(id: number) {
    return await this.httpClient.delete<DeleteUserResponse>(`/${id}`);
  }
}
