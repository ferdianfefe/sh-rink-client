import { Link } from "react-router-dom";

function Navbar(props) {
  if (["home", "list"].includes(props.location.pathname.slice(1))) {
    return (
      <ul className="navbar row">
        <li className="mr-2">
          <Link className="color-white" to="/home">
            Generate URL
          </Link>
        </li>
        <li>
          <Link className="color-white" to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    );
  } else {
    return null;
  }
}

export default Navbar;
