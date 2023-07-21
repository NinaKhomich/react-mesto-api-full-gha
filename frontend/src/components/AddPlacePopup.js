import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddPlace, overlayClickClose, isLoading }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title, link });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      overlayClickClose={overlayClickClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="add-card"
      title="Новое место"
      btnText="Создать"
      isLoading={isLoading}
    >
      <label htmlFor="card-title" className="popup__label">
        <input
          onChange={handleChangeTitle}
          value={title}
          type="text"
          className="popup__field popup__field_add_title"
          id="card-title"
          required
          name="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
        />
        <span className="popup__field-error card-title-error"></span>
      </label>
      <label htmlFor="card-link" className="popup__label">
        <input
          onChange={handleChangeLink}
          value={link}
          type="url"
          className="popup__field popup__field_add_link"
          id="card-link"
          required
          name="link"
          placeholder="Ссылка на картинку"
        />
        <span className="popup__field-error card-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
