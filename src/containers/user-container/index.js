import SideLayout from "../../components/side-layout";
import {Link, useNavigate} from "react-router-dom";
import './style.css'
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {cn as bem} from "@bem-react/classname";
import {deleteCookie} from "../../utils";

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

  const cn = bem("UserContainer")

  const {t} = useTranslate()

  return (
    <div className={cn()}>
      <SideLayout side={'end'} padding={'small-medium'}>
        {select.name ? (
          <>
            <Link className={cn("profile")} to={'/profile'}>{select.name}</Link>
            <button onClick={callbacks.logout}>{t("user.exit")}</button>
          </>
        ) : (
          <button onClick={() => {navigate('/login')}}>{t("user.enter")}</button>
        )}

      </SideLayout>
    </div>

  )
}

export default UserContainer;
