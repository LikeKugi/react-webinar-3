import {Link} from "react-router-dom";
import {routesConstants} from "../../routes";
import "./style.css";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useCallback} from "react";

const translations = {
  ru: {
    title: 'Информация не найдена',
    button: 'На главную',
  },
  en: {
    title: 'Information Not Found',
    button: 'Back to Main',
  }
}

function NotFound() {
  const store = useStore();
  const select = useSelector(state => ({
    lang: state.lang.lang,
  }))
  const callbacks = {
    changeLanguage: useCallback(() => store.actions.lang.toggleLanguage(), [store])

  }
  return (
    <PageLayout>
      <Head title={translations[select.lang].title} lang={select.lang} onButtonClick={callbacks.changeLanguage}/>
      <div className="NotFound">
        <Link to={routesConstants.INDEX}>{translations[select.lang].button}</Link>
      </div>
    </PageLayout>);
}

export default NotFound;
