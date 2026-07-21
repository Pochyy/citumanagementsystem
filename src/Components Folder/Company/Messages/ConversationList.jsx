import React from "react";
import ConversationItem from "./ConversationItem";

export default function ConversationList({
  conversations,
  activeId,
  setActiveId,
}) {
  return (
    <div className="messages__panel">
      <div className="messages__list">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            active={conversation.id === activeId}
            onSelect={setActiveId}
          />
        ))}
      </div>
    </div>
  );
}