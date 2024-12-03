import { ChangeEvent } from "react";
import { Product } from "../../services/product.service";

interface ProductTableProps {
  productList: Product[];
  editProduct: Product | null;
  onProductDelete: (id: number) => void;
  onEditButtonClick: (row: Product) => void;
  onCancelEditProduct: () => void;
  onProductTitleChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSaveProductButtonClick: () => void;
}

const ProductTable = ({
  productList,
  editProduct,
  onProductDelete,
  onEditButtonClick,
  onProductTitleChange,
  onSaveProductButtonClick,
  onCancelEditProduct,
}: ProductTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {productList.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
