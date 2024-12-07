import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import HomePage from "../features/home/HomePage";
import ProductsPage from "../features/products/ProductsPage";
import UsersPage from "../features/users/UsersPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../features/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import CategoryProductsPage from "../features/categories/CategoryProductsPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
          path="/products/:category"
           element={
            <ProtectedRoute>
            <CategoryProductsPage />
          </ProtectedRoute>
        }
         />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
