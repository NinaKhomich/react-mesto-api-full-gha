import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({isOpen, onClose, overlayClickClose, onCardDelete, card}) {

  function handleCardDeleteSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }
  
  return (
    <PopupWithForm 
      onClose={onClose}
      overlayClickClose={overlayClickClose}
      isOpen={isOpen}
      onSubmit={handleCardDeleteSubmit}
      name="delete-card"
      title="Вы уверенны?"
      btnText="Да"
    >
    </PopupWithForm>
  )
}

export default ConfirmPopup;