import { Redirect } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("user");
  return <Redirect to="/" />;
};

export default Logout;
