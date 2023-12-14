import SideLayout from "../../components/side-layout";
import {Link, useNavigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {deleteCookie} from "../../utils";
import UserLayout from "../../components/user-layout";

function UserContainer() {
  const navigate = useNavigate();

  const store = useStore();

  const select = useSelector(state => ({
    name: state.user.user.profile.name,
  }))

  const callbacks = {
    logout: () => {
      store.actions.user.logoutUser();
      deleteCookie('token');
    },
  }

  const {t} = useTranslate()

  return (
    <UserLayout>
      <SideLayout side={'end'} padding={'small-medium'}>
        {select.name ? (
          <>
            <Link to={'/profile'}>{select.name}</Link>
            <button onClick={callbacks.logout}>{t("user.exit")}</button>
          </>
        ) : (
          <button onClick={() => {navigate('/login')}}>{t("user.enter")}</button>
        )}

      </SideLayout>
    </UserLayout>

  )
}

export default UserContainer;
