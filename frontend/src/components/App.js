import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import { register, login, checkToken } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfotooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [cardToDelete, setCardToDelete] = useState({ _id: "" });
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.setProfileInfo(), api.getInitialCards()])
        .then(([userObj, initialCards]) => {
          setCurrentUser(userObj);
          setCards(initialCards);
        })
        .catch((err) =>
          console.log(`Невозможо загрузить данные страницы. Ошибка: ${err})`)
        );
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.email);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((cardItem) =>
            cardItem._id === card._id ? newCard : cardItem
          )
        );
      })
      .catch((err) => console.log(`Что-то пошло не так. Ошибка: ${err})`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((cardItem) => cardItem._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так. Ошибка: ${err})`));
  }

  function handleUpdateUser(formValues) {
    setIsLoading(true);
    api
      .editProfileInfo(formValues)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так. Ошибка: ${err})`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(formValues) {
    setIsLoading(true);
    api
      .editProfileAvatar(formValues)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так. Ошибка: ${err})`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(formValues) {
    setIsLoading(true);
    api
      .addCard(formValues)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Невозможо загрузить данные страницы. Ошибка: ${err})`)
      )
      .finally(() => setIsLoading(false));
  }

  function handleRegister(formValues) {
    register(formValues)
      .then(() => {
        setIsSuccessed(true);
        setIsInfotooltipOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsInfotooltipOpen(true);
        setIsSuccessed(false);
      });
  }

  function handleLogin(formValues) {
    login(formValues)
      .then((res) => {
        setEmail(formValues.email);
        setIsLoggedIn(true);
        navigate("/");
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        console.log(err);
        setIsInfotooltipOpen(true);
        setIsSuccessed(false);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmClick(card) {
    setIsConfirmPopupOpen(true);
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfotooltipOpen(false);
    setSelectedCard({ name: "", link: "" });
    setCardToDelete({ _id: "" });
  }

  function handleCloseOverlay(e) {
    if (e.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function handleSignout() {
    setEmail("");
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={email}
          onSignOut={handleSignout}
          isLoggedIn={isLoggedIn}
        />

        <div>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleConfirmClick}
                    cards={cards}
                  />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute element={Main} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          overlayClickClose={handleCloseOverlay}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          overlayClickClose={handleCloseOverlay}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          overlayClickClose={handleCloseOverlay}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          overlayClickClose={handleCloseOverlay}
          onCardDelete={handleCardDelete}
          card={cardToDelete}
        />

        <ImagePopup
          onClose={closeAllPopups}
          overlayClickClose={handleCloseOverlay}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          overlayClickClose={handleCloseOverlay}
          isSuccessed={isSuccessed}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
