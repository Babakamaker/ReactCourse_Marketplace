import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category, CategoryService } from "../../categories/services/category.service";
import HomeCategoryCard from "./HomeCategoryCard";

const HomeContainer = () => {
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
        setError("Failed to load categories.");
        console.error(err);
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
        <HomeCategoryCard
          key={category.slug}
          name={category.name}
          onClick={() => navigate(`/products/${category.slug}`)}
        />
      ))}
    </div>
  );
};

export default HomeContainer;
