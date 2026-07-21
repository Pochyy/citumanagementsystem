import React, { useState } from "react";
import "./Messages.css";

import { initialConversations } from "./MessageData";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

export default function Messages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(initialConversations[0].id);
  const [draft, setDraft] = useState("");

  const activeConversation = conversations.find(
    (c) => c.id === activeId
  );

  const handleSend = () => {
    const trimmed = draft.trim();

    if (!trimmed) return;

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === activeId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                {
                  id: conversation.messages.length + 1,
                  from: "me",
                  text: trimmed,
                },
              ],
            }
          : conversation
      )
    );

    setDraft("");
  };

  return (
    <div className="messages">
      <div className="messages__layout">
        <ConversationList
          conversations={conversations}
          activeId={activeId}
          setActiveId={setActiveId}
        />

        <ChatWindow
          conversation={activeConversation}
          draft={draft}
          setDraft={setDraft}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
}