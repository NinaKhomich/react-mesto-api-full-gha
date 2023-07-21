import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    onRegister({ password, email });
  }

  return (
    <section className="sign">
      <h1 className="sign__title">Регистрация</h1>
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
        <button
          className="sign__btn"
          type="submit"
          onClick={handleSubmitRegister}
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__logged">
        Уже зарегистрированы?
        <Link className="sign__link-signin" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
