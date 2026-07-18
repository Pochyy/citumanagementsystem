import React, { useState } from 'react';
import ChatSidebar from './ChatSideBar';
import ChatWindow from './ChatWindow';

// =============================================================================
// MessagesPage.jsx
// Top level page: renders the page banner + the split-pane (sidebar/chat) layout.
//
// TODO (Backend / Spring Boot integration):
//   - This component should own the "selected conversation" state and pass the
//     selected thread's data down to <ChatWindow />.
//   - GET /api/messages/threads  -> list of conversation threads for the logged in
//     user (grouped by the other participant). Maps to MESSAGE table where the
//     logged-in user is either SenderID or ReceiverID.
//   - GET /api/messages/thread/{userId} -> full message history between the
//     logged-in user and the selected contact (ordered by DateSent).
//   - POST /api/messages -> send a new message. Body: { senderId, receiverId,
//     messageContent }. DateSent should be set server-side.
//   - Replace all placeholder/mock arrays in child components with data fetched
//     from these endpoints (e.g. via useEffect + fetch/axios, or React Query).
// =============================================================================

const styles = {
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
  // Set to 0 here only to align with the temporary mock message data in
  // ChatWindow.jsx so sent/received bubbles render correctly for preview.
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
    <div style={styles.page}>
      {/* ================= HEADER / PAGE BANNER ================= */}
      <div style={styles.banner}>
        <div style={styles.bannerTitleRow}>
          <span style={styles.megaphoneIcon} role="img" aria-label="megaphone">
            📣
          </span>
          <h1 style={styles.bannerTitle}>Messages</h1>
        </div>
        <p style={styles.bannerSubtitle}>
          STAY UPDATED WITH THE LATEST NEWS AND IMPORTANT NOTICES
        </p>
      </div>

      {/* ================= MAIN SPLIT-PANE LAYOUT ================= */}
      <div style={styles.splitContainer}>
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