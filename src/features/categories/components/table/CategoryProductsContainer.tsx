import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { CategoryService } from "../../services/category.service";
import { Product } from "../../../products/services/product.service";
import CategoryProductsTable from "./CategoryProductsTable";

const CategoryProductsContainer = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const categoryService = new CategoryService();
        const response = await categoryService.getProductsByCategory(category!);
        setProducts(response.products);
      } catch (err) {
        setError((err as AxiosError).message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchProductsByCategory();
  }, [category]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Products in "{category}"</h2>
      <CategoryProductsTable productList={products} />
    </div>
  );
};

export default CategoryProductsContainer;
