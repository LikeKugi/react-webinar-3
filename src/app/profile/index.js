import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ProfileCard from "../../components/profile-card";
import {Navigate} from "react-router-dom";
import {getCookie} from "../../utils";

function Profile() {
  const {t} = useTranslate();
  const token = getCookie('token');

  const select = useSelector(state => ({
    token: state.user.token,
    loading: state.user.waiting,
    name: state.user.user.profile.name,
    phone: state.user.user.profile.phone,
    email: state.user.user.email,
  }));

  if (!token) {
    return <Navigate to={"/login"}/>;
  }

  return (<>
    <Head title={t("title")}>
      <LocaleSelect/>
    </Head>
    <Navigation/>
    <Spinner active={select.loading}>
      <ProfileCard name={<>{t("profile.name")}: <strong>{select.name}</strong></>}
                   email={<>{t("profile.email")}: <strong>{select.email}</strong></>}
                   phone={<>{t("profile.phone")}: <strong>{select.phone}</strong></>}
                   heading={t("profile.heading")}/>
    </Spinner>
  </>);
}
export default Profile;
