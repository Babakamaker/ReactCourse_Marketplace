import { Product } from "../../../products/services/product.service";

interface CategoryProductsTableProps {
  productList: Product[];
}

const CategoryProductsTable = ({ productList }: CategoryProductsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Discount (%)</th>
          <th>Rating</th>
          <th>Stock</th>
          <th>Brand</th>
          <th>Thumbnail</th>
        </tr>
      </thead>
      <tbody>
        {productList.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.category}</td>
            <td>{product.description}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.discountPercentage}%</td>
            <td>{product.rating}</td>
            <td>{product.stock}</td>
            <td>{product.brand}</td>
            <td>
              <img
                src={product.thumbnail}
                alt={product.title}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryProductsTable;
