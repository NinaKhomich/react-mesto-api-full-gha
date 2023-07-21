function InfoTooltip({ isOpen, onClose, overlayClickClose, isSuccessed }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={overlayClickClose}
    >
      <div className="popup__container popup__container_type_infotooltip">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="popup__close-btn"
          type="button"
        ></button>
        <div
          className={`popup__infotooltip-img popup__infotooltip-img_type_${
            isSuccessed ? "success" : "error"
          }`}
        ></div>
        <p className="popup__infotooltip-message">
          {isSuccessed
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}
export default InfoTooltip;
