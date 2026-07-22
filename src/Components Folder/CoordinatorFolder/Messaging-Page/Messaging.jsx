import { useState, useRef, useEffect } from "react";
import { Search, Send, MoreVertical } from "lucide-react";

const initialConversations = {
  daniel: {
    name: "Daniel Adlawan",
    initials: "DA",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Good morning Sir, I just wanted to ask about the logbook submission.",
        time: "9:01 AM",
        unsent: false,
      },
      {
        id: 2,
        sender: "me",
        text: "Good morning! Please submit by Friday EOD through the portal.",
        time: "9:05 AM",
        unsent: false,
      },
      {
        id: 3,
        sender: "them",
        text: "Noted Ma'am! I will submit it today po.",
        time: "9:14 AM",
        unsent: false,
      },
      {
        id: 4,
        sender: "me",
        text: "Thank you. Also make sure all entries are complete.",
        time: "9:20 AM",
        unsent: false,
      },
      {
        id: 5,
        sender: "them",
        text: "Thank you. Sir!",
        time: "9:24 AM",
        unsent: false,
      },
    ],
  },
  vinzent: {
    name: "Vinzent Lariosa",
    initials: "VL",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi Ma'am, when is the deadline?",
        time: "9:15 AM",
        unsent: false,
      },
    ],
  },
  hr: {
    name: "HR-Accenture",
    initials: "HA",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Good day! Evaluation Sent.",
        time: "Yesterday",
        unsent: false,
      },
    ],
  },
  john: {
    name: "John Loquillano",
    initials: "JL",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Good day po. I will Submit today po",
        time: "Yesterday",
        unsent: false,
      },
    ],
  },
};

const initialUnread = { daniel: 0, vinzent: 3, hr: 0, john: 2 };
const contactOrder = ["daniel", "vinzent", "hr", "john"];

function formatNow() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function Messaging() {
  const [conversations, setConversations] = useState(initialConversations);
  const [unread, setUnread] = useState(initialUnread);
  const [activeId, setActiveId] = useState("daniel");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const scrollRef = useRef(null);
  const nextIdRef = useRef(1000);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeId, conversations]);

  const filteredIds = contactOrder.filter((id) =>
    conversations[id].name.toLowerCase().includes(search.toLowerCase())
  );

  const selectContact = (id) => {
    setActiveId(id);
    setOpenMenuId(null);
    setUnread((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && filteredIds.length > 0) {
      selectContact(filteredIds[0]);
      setSearch("");
    }
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const newMsg = {
      id: nextIdRef.current++,
      sender: "me",
      text,
      time: formatNow(),
      unsent: false,
    };
    setConversations((prev) => ({
      ...prev,
      [activeId]: {
        ...prev[activeId],
        messages: [...prev[activeId].messages, newMsg],
      },
    }));
    setDraft("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const unsendMessage = (contactId, msgId) => {
    setConversations((prev) => ({
      ...prev,
      [contactId]: {
        ...prev[contactId],
        messages: prev[contactId].messages.map((m) =>
          m.id === msgId ? { ...m, unsent: true } : m
        ),
      },
    }));
    setOpenMenuId(null);
  };

  const active = conversations[activeId];

  const lastMessagePreview = (conv) => {
    if (conv.messages.length === 0) return "";
    const last = conv.messages[conv.messages.length - 1];
    return last.unsent ? "You unsent a message" : last.text;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* ===== HEADER ===== */}
      <div
        style={{
          padding: "26px 32px",
          backgroundColor: "#7B1113",
          flexShrink: 0,
        }}
      >
        <h1 style={{ margin: 0, color: "white", fontSize: "26px", fontWeight: 600 }}>
          Messaging
        </h1>
        <div
          style={{
            marginTop: "4px",
            color: "rgba(255,255,255,0.85)",
            fontSize: "14px",
          }}
        >
          Direct messages with students and company contacts
        </div>
      </div>

      
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        
        <div
          style={{
            width: "280px",
            borderRight: "1px solid #eee",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div style={{ padding: "16px", flexShrink: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#F0EDED",
                borderRadius: "8px",
                padding: "9px 12px",
              }}
            >
              <Search size={16} color="#999" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search..."
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: "13.5px",
                  width: "100%",
                  color: "#333",
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredIds.length === 0 && (
              <div style={{ padding: "20px", color: "#999", fontSize: "13px", textAlign: "center" }}>
                No contacts found
              </div>
            )}
            {filteredIds.map((id) => {
              const conv = conversations[id];
              const isActive = id === activeId;
              const unreadCount = unread[id];
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <div
                  key={id}
                  onClick={() => selectContact(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 16px",
                    cursor: "pointer",
                    backgroundColor: isActive ? "#F6ECEC" : "white",
                    borderLeft: isActive ? "3px solid #7B1113" : "3px solid transparent",
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = "#fafafa";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: "#7B1113",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {conv.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 700,
                          color: "#333",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {conv.name}
                      </span>
                      <span style={{ fontSize: "11px", color: "#aaa", flexShrink: 0, marginLeft: "6px" }}>
                        {lastMsg ? lastMsg.time : ""}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "2px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          fontStyle: lastMsg && lastMsg.unsent ? "italic" : "normal",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "150px",
                        }}
                      >
                        {lastMessagePreview(conv)}
                      </span>
                      {unreadCount > 0 && (
                        <span
                          style={{
                            backgroundColor: "#7B1113",
                            color: "white",
                            fontSize: "10.5px",
                            fontWeight: 700,
                            borderRadius: "999px",
                            minWidth: "18px",
                            height: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0 5px",
                            flexShrink: 0,
                          }}
                        >
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, backgroundColor: "#FBFAFA" }}>
          {/* chat header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 24px",
              borderBottom: "1px solid #eee",
              backgroundColor: "white",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#7B1113",
                color: "white",
                fontSize: "12px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {active.initials}
            </div>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#7B1113" }}>
              {active.name}
            </span>
          </div>

          
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {active.messages.map((msg) => {
              const isMe = msg.sender === "me";
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                    position: "relative",
                  }}
                  onMouseEnter={() => {}}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexDirection: isMe ? "row-reverse" : "row",
                      maxWidth: "70%",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: msg.unsent ? "transparent" : isMe ? "#7B1113" : "#EDEBEB",
                        color: msg.unsent ? "#999" : isMe ? "white" : "#333",
                        border: msg.unsent ? "1px solid #ddd" : "none",
                        fontStyle: msg.unsent ? "italic" : "normal",
                        padding: "10px 14px",
                        borderRadius: "14px",
                        borderTopRightRadius: isMe && !msg.unsent ? "4px" : "14px",
                        borderTopLeftRadius: !isMe && !msg.unsent ? "4px" : "14px",
                        fontSize: "13.5px",
                        lineHeight: "1.5",
                      }}
                    >
                      {msg.unsent ? "You unsent a message" : msg.text}
                      <div
                        style={{
                          fontSize: "10.5px",
                          marginTop: "4px",
                          color: msg.unsent ? "#bbb" : isMe ? "rgba(255,255,255,0.7)" : "#999",
                        }}
                      >
                        {msg.time}
                      </div>
                    </div>

                    {isMe && !msg.unsent && (
                      <div style={{ position: "relative" }}>
                        <MoreVertical
                          size={15}
                          color="#bbb"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setOpenMenuId(openMenuId === msg.id ? null : msg.id)
                          }
                        />
                        {openMenuId === msg.id && (
                          <div
                            style={{
                              position: "absolute",
                              top: "18px",
                              right: 0,
                              backgroundColor: "white",
                              border: "1px solid #eee",
                              borderRadius: "8px",
                              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                              zIndex: 10,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              onClick={() => unsendMessage(activeId, msg.id)}
                              style={{
                                padding: "8px 16px",
                                fontSize: "12.5px",
                                color: "#7B1113",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "#f7eaea")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "white")
                              }
                            >
                              Unsend message
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 24px",
              borderTop: "1px solid #eee",
              backgroundColor: "white",
              flexShrink: 0,
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                backgroundColor: "#F0EDED",
                borderRadius: "20px",
                padding: "11px 18px",
                fontSize: "13.5px",
                color: "#333",
              }}
            />
            <div
              onClick={sendMessage}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: draft.trim() ? "#7B1113" : "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: draft.trim() ? "pointer" : "default",
                flexShrink: 0,
                transition: "background-color 0.15s ease",
              }}
            >
              <Send size={16} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
