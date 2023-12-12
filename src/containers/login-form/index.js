import useTranslate from "../../hooks/use-translate";
import {useCallback, useState} from "react";
import InputField from "../../components/input-field";
import {cn as bem} from '@bem-react/classname';
import './style.css'

function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('Текст ошибки от сервера');
  const {t} = useTranslate();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, [])
  const cn = bem('LoginForm')
  return (
    <form onSubmit={handleSubmit} className={cn()}>
      <InputField label={t("user.label.login")} type="text" onChange={setLogin} value={login} name="login" />
      <InputField label={t("user.label.password")} type="password" onChange={setPassword} value={password} name="password" />
      {error && <p className={cn('error')}>{error}</p>}
      <button type="submit">{t("user.submit")}</button>
    </form>
  )
}

export default LoginForm
