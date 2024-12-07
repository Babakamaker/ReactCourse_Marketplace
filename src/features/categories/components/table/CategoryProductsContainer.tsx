import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { CategoryService } from "../../services/category.service";
import { Product, ProductService } from "../../../products/services/product.service";
import CategoryProductsTable from "./CategoryProductsTable";

const CategoryProductsContainer = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!category) return;

      try {
        setLoading(true);
        const categoryService = new CategoryService();
        const response = await categoryService.getProductsByCategory(category);
        setProducts(response.products);
      } catch (err) {
        setError(
          (err as AxiosError).message || "Failed to load products."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  const handleProductDelete = async (id: number) => {
    try {
      setLoading(true);
      const productService = new ProductService();
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProductButtonClick = async () => {
    if (!editProduct) return;

    try {
      setLoading(true);
      const productService = new ProductService();
      await productService.updateProduct(editProduct.id, { title: editProduct.title });
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editProduct.id ? { ...product, title: editProduct.title } : product
        )
      );
      setEditProduct(null);
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditButtonClick = (row: Product) => {
    setEditProduct(row);
  };

  const handleProductTitleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setEditProduct((prev) => (prev?.id === id ? { ...prev, title: event.target.value } : prev));
  };

  const handleCancelEditProduct = () => {
    setEditProduct(null);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Products in "{category}"</h2>
      <CategoryProductsTable
        productList={products}
        editProduct={editProduct}
        onProductDelete={handleProductDelete}
        onEditButtonClick={handleEditButtonClick}
        onProductTitleChange={handleProductTitleChange}
        onSaveProductButtonClick={handleSaveProductButtonClick}
        onCancelEditProduct={handleCancelEditProduct}
      />
    </div>
  );
};

export default CategoryProductsContainer;
