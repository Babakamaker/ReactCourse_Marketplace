import { Link} from "react-router-dom"

const AppNavbar = () => {


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
          <li>
            <Link to="/users">Users</Link>
          </li>
      </ul>
    </nav>
  )
}
export default AppNavbar