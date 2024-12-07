import { ChangeEvent } from "react";
import { Product } from "../../../products/services/product.service";

interface CategoryProductsTableProps {
  productList: Product[];
  editProduct: Product | null;
  onProductDelete: (id: number) => void;
  onEditButtonClick: (row: Product) => void;
  onCancelEditProduct: () => void;
  onProductTitleChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSaveProductButtonClick: () => void;
}

const CategoryProductsTable = ({
  productList,
  editProduct,
  onProductDelete,
  onEditButtonClick,
  onProductTitleChange,
  onSaveProductButtonClick,
  onCancelEditProduct,
}: CategoryProductsTableProps) => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = currentUser?.role === "admin";
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Photo</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          {isAdmin && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {productList.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "4px" }}
              />
            </td>
            <td>
              {editProduct?.id === product.id ? (
                <input
                  type="text"
                  value={editProduct.title}
                  onChange={(event) => onProductTitleChange(event, product.id)}
                />
              ) : (
                product.title
              )}
            </td>
            <td>{product.category}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.stock}</td>
            {isAdmin && (
            <td>
              <div style={{ display: "flex", gap: "1em" }}>
                {editProduct?.id === product.id ? (
                  <>
                    <button onClick={onSaveProductButtonClick}>Save</button>
                    <button onClick={onCancelEditProduct}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => onEditButtonClick(product)}>Edit</button>
                    <button onClick={() => onProductDelete(product.id)}>Delete</button>
                  </>
                )}
              </div>
            </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default CategoryProductsTable;
