const PopupWithForm = ({
  name,
  title,
  btnText,
  isOpen,
  onClose,
  overlayClickClose,
  onSubmit,
  isLoading,
  children,
}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onMouseDown={overlayClickClose}>
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="popup__close-btn"
          type="button"
        ></button>
        <form
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="popup__head">{title}</h2>
          {children}
          <button className="popup__save-btn" type="submit">
            {isLoading ? 'Сохранение...' : btnText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
