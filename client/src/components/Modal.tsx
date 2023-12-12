type Props = {
  message: string;
  okText?: string;
  cancelText?: string;
  onOk: () => void;
  onCancel?: () => void;
};

function Modal({
  message,
  okText = "Yes",
  cancelText = "No",
  onOk,
  onCancel,
}: Props) {
  return (
    <div className="overlay">
      <div className="modal">
        <p>{message}</p>
        <button onClick={onOk}>{okText}</button>
        {onCancel && <button onClick={onCancel}>{cancelText}</button>}
      </div>
    </div>
  );
}

export default Modal;
