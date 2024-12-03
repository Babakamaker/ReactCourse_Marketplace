/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryService } from "../categories/services/category.service";

interface Category {
  slug: string;
  name: string;
  url: string;
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoryService = new CategoryService();
        const response = await categoryService.getAllCategories();
        setCategories(response);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {categories.map((category) => (
        <div
          key={category.slug}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <h3>{category.name}</h3>
          <button onClick={() => navigate(`/products/${category.slug}`)}>View Products</button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
