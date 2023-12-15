import {Navigate, Outlet} from "react-router-dom";
import {getCookie} from "../../utils";
import useSelector from "../../hooks/use-selector";
import useAuth from "../../hooks/use-auth";

function PrivateToken() {
  const token = getCookie("token");

  useAuth();

  const select = useSelector(state => ({
    error: state.session.error,
  }));

  if (!token || select.error) {
    return <Navigate to={"/login"}/>;
  }

  return <Outlet/>;
}

export default PrivateToken;
