import { Link, useNavigate} from "react-router-dom"

const AppNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userJson = localStorage.getItem("user");

  let user;

  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error(error);
  }


return (
    <nav>
      <ul>
        <li>
          <Link to="/" state={{ hello: "Hello, world!" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        {user?.role === "admin" && (
          <li>
            <Link to="/users">Users</Link>
          </li>
        )}
         <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}
export default AppNavbar