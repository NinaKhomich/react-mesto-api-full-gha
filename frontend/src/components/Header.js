import { Link, NavLink, Route, Routes } from "react-router-dom";
import logo from "../images/logo.svg";
import { useState } from "react";

const Header = ({ userEmail, onSignOut, isLoggedIn }) => {
const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

function toggleBurgerState() {
  setIsBurgerMenuOpen(!isBurgerMenuOpen);
}

function handleLogoutProfile() {
  onSignOut();
  setIsBurgerMenuOpen(false);
}

  return (
    <header className={`header ${isBurgerMenuOpen ? "header_menu-open" : ""}`}>
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <nav className={`header__nav ${isBurgerMenuOpen ? "header__nav_opened" : ""}`}>
              <span className="header__user-email">{userEmail}</span>
              <NavLink
                onClick={handleLogoutProfile}
                className="header__link header__link_sign-out"
                to="/sign-in"
              >
                Выйти
              </NavLink>
            </nav>
          }
        />
      </Routes>
      { isLoggedIn
      ? <div onClick={toggleBurgerState} className={`header__burger ${isBurgerMenuOpen ? "header__burger_opened" : ""}`}>
          { !isBurgerMenuOpen
          ? <span className="header__burger-line"></span>
          : <></>
          }
        </div>
      : <></> }
        
    </header>
  );
};

export default Header;
