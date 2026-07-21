export default function Composer({
  draft,
  setDraft,
  handleSend,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="messages__composer">
      <input
        className="messages__input"
        type="text"
        placeholder="Type a message..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className="messages__send-btn"
        onClick={handleSend}
        aria-label="Send"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
</button>
    </div>
  );
}