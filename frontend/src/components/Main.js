import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const cardsElements = cards.map((card) => {
    return (
      <div key={card._id}>
        <Card
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      </div>
    );
  })

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-box" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Аватар профиля"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Редактировать профиль"
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          aria-label="Добавить"
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section aria-label="Фотографии профиля" className="cards">
        {cardsElements}
      </section>
    </main>
  );
};

export default Main;
