import useTranslate from "../../hooks/use-translate";
import {useEffect, useState} from "react";
import InputField from "../../components/input-field";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import FormLayout from "../../components/form-layout";

function LoginForm() {
  const store = useStore();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const {t} = useTranslate();

  const select = useSelector(state => ({
    error: state.user.error,
  }))

  useEffect(() => {
    store.actions.user.resetState();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    store.actions.user.loginUser({login, password});
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
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
      {select.error && <p>{select.error}</p>}
      <button type="submit">{t("user.submit")}</button>
    </FormLayout>
  );
}

export default LoginForm;
