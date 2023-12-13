import useTranslate from "../../hooks/use-translate";
import {useCallback, useState} from "react";
import InputField from "../../components/input-field";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function LoginForm() {
  const store = useStore();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const {t} = useTranslate();

  const select = useSelector(state => ({
    error: state.user.error,
  }))

  const callbacks = {
    handleSubmit: useCallback((e) => {
      e.preventDefault();
      store.actions.user.loginUser({login, password});
    }, [login, password]),
  }
  const cn = bem("LoginForm");
  return (
    <form onSubmit={callbacks.handleSubmit}
          className={cn()}>
      <InputField label={t("user.label.login")}
                  type="text"
                  onChange={setLogin}
                  value={login}
                  name="login"/>
      <InputField label={t("user.label.password")}
                  type="password"
                  onChange={setPassword}
                  value={password}
                  name="password"/>
      {select.error && <p className={cn("error")}>{select.error}</p>}
      <button type="submit">{t("user.submit")}</button>
    </form>
  );
}

export default LoginForm;
