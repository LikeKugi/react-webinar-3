import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import SideLayout from "../../components/side-layout";
import LoginForm from "../../containers/login-form";
import Heading from "../../components/heading/heading";

function Login() {
  const store = useStore();

  const {t} = useTranslate();
  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <SideLayout padding={'medium'}>
        <Heading text={t("user.enter")} variant={'h2'} />
      </SideLayout>
      <LoginForm />
    </>
  )
}

export default Login;
