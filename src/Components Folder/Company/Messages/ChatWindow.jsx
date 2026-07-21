import React from "react";
import MessageBubble from "./MessageBubble";
import Composer from "./Composer";

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ChatWindow({
  conversation,
  draft,
  setDraft,
  handleSend,
}) {
  if (!conversation) return null;

  return (
    <div className="messages__panel messages__conversation">
      <div className="messages__conversation-header">
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
          <p className="messages__conversation-name">
            {conversation.name}
          </p>

          <p className="messages__conversation-sub">
            {conversation.course} · {conversation.school}
          </p>
        </div>
      </div>

      <div className="messages__thread-body">
        {conversation.messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}
      </div>

      <Composer
        draft={draft}
        setDraft={setDraft}
        handleSend={handleSend}
      />
    </div>
  );
}