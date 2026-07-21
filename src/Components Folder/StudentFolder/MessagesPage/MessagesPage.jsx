import React, { useState } from 'react';
import ChatThreadCard from './ChatThreadCard';
import MessageBubble from './MessageBubble';

// =============================================================================
// MessagesPage.jsx  (COMBINED FILE)
//
// This single file contains:
//   1. MessageInput   - bottom pill input for composing a message
//   2. ChatSidebar    - left-hand search + thread list panel
//   3. ChatWindow     - right-hand active conversation panel
//   4. MessagesPage   - top-level page that ties everything together
//
// NOTE: ChatThreadCard.jsx and MessageBubble.jsx are kept as SEPARATE files
// (imported above) and are used by ChatSidebar and ChatWindow respectively.
//
// TODO (Backend / Spring Boot integration):
//   - GET /api/messages/threads?userId={currentUserId}
//       -> list of conversation threads (grouped by other participant),
//          replaces MOCK_THREADS in ChatSidebar.
//   - GET /api/messages/thread/{currentUserId}/{activeContact.id}
//       -> full message history between the two users, ordered by DateSent ASC,
//          replaces MOCK_MESSAGES in ChatWindow.
//   - POST /api/messages
//       Body: { senderId, receiverId, messageContent }, DateSent set server-side.
//       Wired up via MessageInput's onSend -> ChatWindow's handleSendMessage.
//   - Add loading / empty / error states around all fetches as noted inline below.
// =============================================================================

// =============================================================================
// 1. MessageInput
// =============================================================================
const inputStyles = {
  wrapper: {
    padding: '16px 24px',
    borderTop: '1px solid #eee',
  },
  pill: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: '24px',
    padding: '10px 10px 10px 20px',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#555',
  },
  sendButton: {
    flexShrink: 0,
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#333',
  },
};

function MessageInput({ onSend }) {
  // Local state for the text currently being typed.
  // TODO: this is where the value ultimately submitted to
  // POST /api/messages (as MessageContent) is captured.
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    // TODO: replace with real submit handler -> calls Spring Boot endpoint
    // POST /api/messages via onSend prop passed down from ChatWindow.
    if (onSend) onSend(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={inputStyles.wrapper}>
      <div style={inputStyles.pill}>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={inputStyles.input}
        />
        {/* Send button -> TODO: wire onClick to POST /api/messages */}
        <button
          type="button"
          style={inputStyles.sendButton}
          onClick={handleSend}
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// 2. ChatSidebar
// =============================================================================

// TEMP MOCK DATA - simulates rows that will come from the MESSAGE table
// (grouped by conversation) joined with USER data. Replace with API response.
const MOCK_THREADS = [
  {
    id: 1,
    name: 'Daniel Adlawan',
    initials: 'DA',
    lastMessage: 'Thank you. Sir!',
    timestamp: 'Now',
    unreadCount: 0,
  },
  {
    id: 2,
    name: 'Vinzent Lariosa',
    initials: 'VL',
    lastMessage: 'When is the deadline?',
    timestamp: '9:15 AM',
    unreadCount: 3,
  },
  {
    id: 3,
    name: 'HR-Accenture',
    initials: 'HA',
    lastMessage: 'Evaluation Sent.',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 4,
    name: 'John Loquillano',
    initials: 'JL',
    lastMessage: 'I will Submit today po',
    timestamp: 'Yesterday',
    unreadCount: 2,
  },
];

const sidebarStyles = {
  sidebar: {
    width: '300px',
    flexShrink: 0,
    backgroundColor: '#fdf3f4',
    borderRight: '1px solid #f0e0e1',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  searchWrapper: {
    padding: '18px 16px',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#fff',
    border: '1px solid #e8d3d4',
    borderRadius: '20px',
    padding: '9px 14px',
  },
  searchIcon: {
    fontSize: '13px',
    color: '#a89a9b',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '13px',
    color: '#555',
    width: '100%',
  },
  threadList: {
    flex: 1,
    overflowY: 'auto',
  },
};

function ChatSidebar({ selectedThreadId, onSelectThread }) {
  // TODO: lift searchTerm up or connect to a debounced API search call
  const [searchTerm, setSearchTerm] = useState('');

  // TEMP client-side filter of mock data; replace with server-side search
  // once GET /api/messages/threads/search is available.
  const filteredThreads = MOCK_THREADS.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={sidebarStyles.sidebar}>
      {/* ================= SEARCH ================= */}
      <div style={sidebarStyles.searchWrapper}>
        <div style={sidebarStyles.searchBox}>
          <span style={sidebarStyles.searchIcon} role="img" aria-label="search">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={sidebarStyles.searchInput}
          />
        </div>
      </div>

      {/* ================= THREAD LIST ================= */}
      <div style={sidebarStyles.threadList}>
        {/* TODO: loading state -> render skeleton ChatThreadCard placeholders here */}
        {/* TODO: error state -> render a retry message here if fetch failed */}
        {/* TODO: empty state -> render "No conversations found" when filteredThreads.length === 0 */}
        {filteredThreads.map((thread) => (
          <ChatThreadCard
            key={thread.id} // MESSAGE/USER table PK - required for React list reconciliation
            thread={thread}
            isActive={thread.id === selectedThreadId}
            onSelect={onSelectThread}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// 3. ChatWindow
// =============================================================================

// TEMP MOCK DATA - simulates MESSAGE rows for the Daniel Adlawan thread.
// Replace with the API response described above.
const MOCK_MESSAGES = [
  {
    messageId: 101,
    senderId: 1, // Daniel Adlawan (contact)
    receiverId: 0, // current user
    messageContent: 'Good morning Sir, I just wanted to ask about the logbook submission.',
    displayTime: '9:01 AM',
  },
  {
    messageId: 102,
    senderId: 0, // current user
    receiverId: 1,
    messageContent: 'Good morning! Please submit by Friday EOD through the portal.',
    displayTime: '9:05 AM',
  },
  {
    messageId: 103,
    senderId: 1,
    receiverId: 0,
    messageContent: "Noted Ma'am! I will submit it today po.",
    displayTime: '9:14 AM',
  },
  {
    messageId: 104,
    senderId: 0,
    receiverId: 1,
    messageContent: 'Thank you. Also make sure all entries are complete.',
    displayTime: '9:20 AM',
  },
  {
    messageId: 105,
    senderId: 1,
    receiverId: 0,
    messageContent: 'Thank you. Sir!',
    displayTime: '9:24 AM',
  },
];

const windowStyles = {
  window: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    backgroundColor: '#ffffff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px 24px',
    borderBottom: '1px solid #f0e0e1',
    backgroundColor: '#fdf3f4',
  },
  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#8c2432',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 700,
    flexShrink: 0,
  },
  headerName: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#222',
  },
  messageList: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 24px 0 24px',
  },
  emptyState: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: '40px',
    fontSize: '14px',
  },
};

function ChatWindow({ activeContact, currentUserId }) {
  // TODO: replace with real fetch of thread messages keyed by activeContact.id
  const [messages] = useState(MOCK_MESSAGES);

  // TODO: replace with real POST /api/messages call (see MessageInput above)
  const handleSendMessage = (text) => {
    // Placeholder only - no backend logic here yet.
    console.log('TODO: send message to backend ->', {
      senderId: currentUserId,
      receiverId: activeContact?.id,
      messageContent: text,
    });
  };

  if (!activeContact) {
    // TODO: this is the "no thread selected" empty state
    return (
      <div style={windowStyles.window}>
        <div style={windowStyles.emptyState}>Select a conversation to start messaging.</div>
      </div>
    );
  }

  return (
    <div style={windowStyles.window}>
      {/* ================= ACTIVE CHAT HEADER ================= */}
      <div style={windowStyles.header}>
        <div style={windowStyles.avatar}>{activeContact.initials}</div>
        <div style={windowStyles.headerName}>{activeContact.name}</div>
      </div>

      {/* ================= MESSAGE LIST (scrollable) ================= */}
      <div style={windowStyles.messageList}>
        {/* TODO: loading state -> render skeleton bubbles while fetching */}
        {/* TODO: error state -> render retry message if fetch failed */}
        {/* TODO: empty state -> render "No messages yet" when messages.length === 0 */}
        {messages.map((message) => (
          <MessageBubble
            key={message.messageId} // MESSAGE.MessageID (PK)
            message={message}
            isSentByCurrentUser={message.senderId === currentUserId}
          />
        ))}
      </div>

      {/* ================= MESSAGE INPUT (bottom, fixed) ================= */}
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}

// =============================================================================
// 4. MessagesPage
// =============================================================================
const pageStyles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
  banner: {
    padding: '24px 32px 18px 32px',
    borderBottom: '1px solid #eee',
  },
  bannerTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  megaphoneIcon: {
    fontSize: '22px',
    color: '#8c2432',
    transform: 'rotate(0deg)',
  },
  bannerTitle: {
    margin: 0,
    fontSize: '26px',
    fontWeight: 700,
    color: '#8c2432',
    letterSpacing: '0.3px',
  },
  bannerSubtitle: {
    margin: '4px 0 0 32px',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '1px',
    color: '#9a9a9a',
  },
  splitContainer: {
    display: 'flex',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
  },
};

function MessagesPage() {
  // TODO: Replace with real logged-in user id (from auth context / session).
  // Set to 0 here only to align with the temporary mock message data above
  // so sent/received bubbles render correctly for preview.
  const currentUserId = 0; // e.g. from AuthContext -> user.userId

  // TODO: selectedThread should hold the currently active conversation's
  // contact info (ContactID, Name, Avatar initials, etc.) sourced from the
  // ChatThreadCard the user clicked on. Lifted here so ChatWindow knows who
  // is being messaged.
  const [selectedThread, setSelectedThread] = useState({
    id: 1,
    name: 'Daniel Adlawan',
    initials: 'DA',
  });

  return (
    <div style={pageStyles.page}>
      {/* ================= HEADER / PAGE BANNER ================= */}
      <div style={pageStyles.banner}>
        <div style={pageStyles.bannerTitleRow}>
          <span style={pageStyles.megaphoneIcon} role="img" aria-label="megaphone">
            📣
          </span>
          <h1 style={pageStyles.bannerTitle}>Messages</h1>
        </div>
        <p style={pageStyles.bannerSubtitle}>
          STAY UPDATED WITH THE LATEST NEWS AND IMPORTANT NOTICES
        </p>
      </div>

      {/* ================= MAIN SPLIT-PANE LAYOUT ================= */}
      <div style={pageStyles.splitContainer}>
        {/* Left: sidebar with search + list of chat threads */}
        <ChatSidebar
          selectedThreadId={selectedThread?.id}
          onSelectThread={setSelectedThread}
        />

        {/* Right: active conversation window */}
        <ChatWindow activeContact={selectedThread} currentUserId={currentUserId} />
      </div>
    </div>
  );
}

export default MessagesPage;