import PageLayout from "../../components/page-layout";
import UserContainer from "../../containers/user-container";
import {Outlet} from "react-router-dom";

function Root() {
  return (
    <PageLayout head={<UserContainer />}>
      <Outlet />
    </PageLayout>
  )
}

export default Root;
