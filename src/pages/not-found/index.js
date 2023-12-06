import {Link} from "react-router-dom";
import {routesConstants} from "../../routes";
import "./style.css";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";

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
  const lang = document.body.dataset.lang || 'ru';
  return (
    <PageLayout>
      <Head title={translations[lang].title}/>
      <div className="NotFound">
        <Link to={routesConstants.INDEX}>{translations[lang].button}</Link>
      </div>
    </PageLayout>);
}

export default NotFound;
