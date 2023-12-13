import PageLayout from "../../components/page-layout";
import UserContainer from "../../containers/user-container";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {getCookie} from "../../utils";
import useStore from "../../hooks/use-store";

function Root() {

  const store = useStore();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      console.log('loading user')
      store.actions.user.setToken(token);
      store.actions.user.selfUser();
    }
  }, []);

  return (
    <PageLayout head={<UserContainer />}>
      <Outlet />
    </PageLayout>
  )
}

export default Root;
