import PageLayout from "../../components/page-layout";
import UserContainer from "../../containers/user-container";
import {Outlet} from "react-router-dom";
import useAuth from "../../hooks/use-auth";

function Root() {

  useAuth();

  return (
    <PageLayout head={<UserContainer />}>
      <Outlet />
    </PageLayout>
  )
}

export default Root;
