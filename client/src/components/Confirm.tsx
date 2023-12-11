type Props = {
  question: string;
  okText?: string;
  cancelText?: string;
  onOk: () => void;
  onCancel: () => void;
};

function Confirm({
  question,
  okText = "Yes",
  cancelText = "No",
  onOk,
  onCancel,
}: Props) {
  return (
    <div className="overlay">
      <div className="modal">
        <p>{question}</p>
        <button onClick={onOk}>{okText}</button>
        <button onClick={onCancel}>{cancelText}</button>
      </div>
    </div>
  );
}

export default Confirm;
