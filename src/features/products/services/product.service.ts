import { GenericAbortSignal } from "axios";
import { HttpClient } from "../../../utils/http/HttpClient";

interface PaginatedResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface PaginatedProductResponse extends PaginatedResponse {
  products: Product[];
}

type CreateProductRequest = Omit<Product, "id" | "images"> & {
  images?: string[];
};
type UpdateProductRequest = Partial<CreateProductRequest>;
type DeleteProductResponse = Product & {
  isDeleted: boolean;
  deletedOn: Date | string;
};

export class ProductService {
  private httpClient: HttpClient;

  constructor(signal?: GenericAbortSignal) {
    this.httpClient = new HttpClient({
      baseURL: "https://dummyjson.com/products",
      signal,
    });
  }

  /** Get all products with pagination */
  public async getAllProducts(limit: number = 30, skip: number = 0) {
    return await this.httpClient.get<PaginatedProductResponse>(
      `?limit=${limit}&skip=${skip}`
    );
  }

  /** Get a single product by ID */
  public async getProductById(id: number) {
    return await this.httpClient.get<Product>(`/${id}`);
  }

  /** Search products */
  public async searchProducts(query: string) {
    return await this.httpClient.get<PaginatedProductResponse>(
      `/search?q=${query}`
    );
  }

  /** Get sorted products */
  public async getSortedProducts(sortBy: string, order: "asc" | "desc" = "asc") {
    return await this.httpClient.get<PaginatedProductResponse>(
      `?sortBy=${sortBy}&order=${order}`
    );
  }

  /** Get product categories */
  public async getProductCategories() {
    return await this.httpClient.get<string[]>("/categories");
  }

  /** Get products by category */
  public async getProductsByCategory(category: string) {
    return await this.httpClient.get<PaginatedProductResponse>(
      `/category/${category}`
    );
  }

  /** Add a new product */
  public async addProduct(product: CreateProductRequest) {
    return await this.httpClient.post<Product, CreateProductRequest>("/add", product);
  }

  /** Update an existing product */
  public async updateProduct(id: number, product: UpdateProductRequest) {
    return await this.httpClient.put<Product, UpdateProductRequest>(
      `/${id}`,
      product
    );
  }

  /** Delete a product by ID */
  public async deleteProduct(id: number) {
    return await this.httpClient.delete<DeleteProductResponse>(`/${id}`);
  }
}
