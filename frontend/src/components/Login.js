import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    onLogin({ password, email });
  }

  return (
    <section className="sign">
      <h1 className="sign__title">Вход</h1>
      <form className="sign__form">
        <input
          type="email"
          className="sign__input"
          name="email"
          value={email}
          onChange={handleSetEmail}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="sign__input"
          name="password"
          value={password}
          onChange={handleSetPassword}
          placeholder="Пароль"
          required
        />
        <button className="sign__btn" type="submit" onClick={handleSubmitLogin}>
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
