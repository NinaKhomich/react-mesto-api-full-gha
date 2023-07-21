import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, overlayClickClose, onUpdateAvatar, isLoading }) {
  const inputAvatar = useRef();

  function handleSubmitFormAvatar(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
  }

  useEffect(() => {
    inputAvatar.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onClose={onClose}
      overlayClickClose={overlayClickClose}
      isOpen={isOpen}
      onSubmit={handleSubmitFormAvatar}
      name="edit-avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      isLoading={isLoading}
    >
      <label htmlFor="user-avatar" className="popup__label">
        <input
          ref={inputAvatar}
          type="url"
          className="popup__field popup__field_edit_avatar"
          id="avatar-link"
          required
          name="avatar"
          placeholder="Ссылка на новый аватар"
        />
        <span className="popup__field-error avatar-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
