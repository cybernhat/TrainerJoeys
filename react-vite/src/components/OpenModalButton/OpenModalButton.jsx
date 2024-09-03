import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text that triggers the modal
  onButtonClick, // optional: callback function for button click
  onModalClose // optional: callback function for modal close
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <div onClick={onClick} className="modal-trigger">
      {buttonText}
    </div>
  );
}

export default OpenModalButton;
