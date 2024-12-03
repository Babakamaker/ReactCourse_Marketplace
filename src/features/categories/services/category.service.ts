/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericAbortSignal } from "axios";
import { HttpClient } from "../../../utils/http/HttpClient";

interface PaginatedResponse {
  total: number;
  skip: number;
  limit: number;
}

export class CategoryService {
  private httpClient: HttpClient;

  constructor(signal?: GenericAbortSignal) {
    this.httpClient = new HttpClient({
      baseURL: "https://dummyjson.com/products",
      signal,
    });
  }

  /** Get all product categories */
  public async getAllCategories() {
    return await this.httpClient.get<string[]>("/categories");
  }

  /** Get products by a specific category */
  public async getProductsByCategory(category: string, limit: number = 30, skip: number = 0) {
    return await this.httpClient.get<PaginatedResponse & { products: any[] }>(
      `/category/${category}?limit=${limit}&skip=${skip}`
    );
  }

  /** Add a new category */
  public async addCategory(category: string) {
    return await this.httpClient.post<{ category: string }, { category: string }>("/add-category", { category });
  }

  /** Delete a category*/
  public async deleteCategory(category: string) {
    return await this.httpClient.delete<{ category: string }>("/delete-category", { data: { category } });
  }
}
