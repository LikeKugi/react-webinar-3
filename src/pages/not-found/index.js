import {Link} from "react-router-dom";
import {routesConstants} from "../../routes";
import "./style.css";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";

function NotFound() {
  return (
    <PageLayout>
      <Head title={"Информация не найдена"}/>
      <div className="NotFound">
        <Link to={routesConstants.INDEX}>На главную</Link>
      </div>
    </PageLayout>);
}

export default NotFound;
