import {deleteCookie, getCookie} from "../utils";
import useStore from "./use-store";
import {useEffect} from "react";
import useSelector from "./use-selector";

function useAuth() {
  const token = getCookie('token');
  const store = useStore();
  const select = useSelector(state=> ({
    error: state.session.error,
    loading: state.session.waiting,
  }))

  useEffect(() => {
    if (select.loading) {
      return;
    }
    if (select.error) {
      deleteCookie('token');
      return;
    }
    const load = async () => {
      await store.actions.session.selfUser(token);
    }
    if (token) {
      load();
    }
  }, [select.error]);
}

export default useAuth;
