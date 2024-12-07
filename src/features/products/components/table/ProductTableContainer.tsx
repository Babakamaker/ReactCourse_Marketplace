import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Product, ProductService } from "../../services/product.service";
import ProductTable from "./ProductTable";

const ProductTableContainer = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const productService = new ProductService(abortController.signal);

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAllProducts();
        if (isMounted) setProductList(response.products);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const handleProductDelete = async (id: number) => {
    try {
      setLoading(true);
      const abortController = new AbortController();
      const productService = new ProductService(abortController.signal);
        await productService.deleteProduct(id);
      setProductList((prev) => prev.filter((product) => product.id !== id));
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
      const abortController = new AbortController();
      const productService = new ProductService(abortController.signal);
      await productService.updateProduct(editProduct.id, { title: editProduct.title });
      setProductList((prev) =>
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

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ProductTable
        productList={productList}
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

export default ProductTableContainer;
