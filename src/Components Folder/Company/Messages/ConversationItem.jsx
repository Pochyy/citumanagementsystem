function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ConversationItem({
  conversation,
  active,
  onSelect,
}) {
  const lastMessage =
    conversation.messages[conversation.messages.length - 1];

  return (
    <div
      className={
        active
          ? "messages__thread messages__thread--active"
          : "messages__thread"
      }
      onClick={() => onSelect(conversation.id)}
    >
      <div
        className="messages__avatar"
        style={{
          background: conversation.avatar.bg,
          color: conversation.avatar.color,
        }}
      >
        {initials(conversation.name)}
      </div>

      <div>
        <p className="messages__thread-name">
          {conversation.name}
        </p>

        <p className="messages__thread-preview">
          {lastMessage.text}
        </p>
      </div>
    </div>
  );
}