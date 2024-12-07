/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, GenericAbortSignal } from "axios";
import { HttpClient } from "../../../utils/http/HttpClient";

interface PaginatedResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
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
  public async getAllCategories(): Promise<Category[]> {
    try {
      const response = await this.httpClient.get<Category[]>("/categories");
      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error((error as AxiosError).message);
    }
  }

/** Get products by a specific category */
public async getProductsByCategory(category: string, limit: number = 30, skip: number = 0) {
  try {
    const response = await this.httpClient.get<PaginatedResponse & { products: any[] }>(
      `/category/${category}?limit=${limit}&skip=${skip}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error((error as AxiosError).message);
  }
}


}
