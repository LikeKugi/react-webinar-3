import SideLayout from "../../components/side-layout";
import {useNavigate} from "react-router-dom";
import './style.css'
import useTranslate from "../../hooks/use-translate";

function UserContainer() {
  const navigate = useNavigate();

  const {t} = useTranslate()

  return (
    <div className="UserContainer">
      <SideLayout side={'end'} padding={'small-medium'}>
        <button onClick={() => {navigate('/login')}}>{t("user.enter")}</button>
      </SideLayout>
    </div>

  )
}

export default UserContainer;
