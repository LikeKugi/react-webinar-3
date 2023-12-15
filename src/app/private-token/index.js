import {Navigate, Outlet} from "react-router-dom";
import {deleteCookie, getCookie} from "../../utils";
import {useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function PrivateToken() {
  const token = getCookie("token");

  const store = useStore();

  const select = useSelector(state => ({
    error: state.user.error,
  }));

  useEffect(() => {
    const load = async () => {
      await store.actions.user.selfUser(token);
    };
    load();
  }, []);

  if (!token || select.error) {
    deleteCookie("token");
    return <Navigate to={"/login"}/>;
  }

  return <Outlet/>;
}

export default PrivateToken;
