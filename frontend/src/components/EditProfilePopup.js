import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, overlayClickClose, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      overlayClickClose={overlayClickClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isLoading={isLoading}
    >
      <label htmlFor="user-name" className="popup__label">
        <input
          type="text"
          className="popup__field popup__field_edit_name"
          id="user-name"
          name="name"
          value={name ?? ""}
          onChange={handleChangeName}
          required
          placeholder="Имя"
          minLength="2"
          maxLength="40"
        />
        <span className="popup__field-error user-name-error"></span>
      </label>
      <label htmlFor="user-job" className="popup__label">
        <input
          type="text"
          className="popup__field popup__field_edit_job"
          id="user-job"
          name="about"
          value={description ?? ""}
          onChange={handleChangeDescription}
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__field-error user-job-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
