export default function MessageBubble({ message }) {
  return (
    <div
      className={`messages__bubble-row messages__bubble-row--${message.from}`}
    >
      <div
        className={`messages__bubble messages__bubble--${message.from}`}
      >
        {message.text}
      </div>
    </div>
  );
}