import React from 'react';

// =============================================================================
// ChatThreadCard.jsx
// A single contact row inside the sidebar list: avatar badge, name, last
// message snippet, timestamp/day, and an optional unread-count badge.
//
// Props (all should eventually come from the database via MessagesPage/
// ChatSidebar):
//   - thread: {
//       id            -> MESSAGE / USER table PK (ContactID / SenderID / ReceiverID)
//       name          -> Contact's full name (joined from USER table)
//       initials      -> Derived from contact name, or a stored avatar field
//       lastMessage   -> MessageContent of the most recent MESSAGE row for this thread
//       timestamp     -> Formatted DateSent of the most recent message ("9:15 AM", "Yesterday")
//       unreadCount   -> COUNT of unread MESSAGE rows for this thread (TODO: needs an
//                        "isRead" style column, not present in current ERD snippet --
//                        flag for backend team when ERD is finalized)
//     }
//   - isActive: boolean, true when this thread is the currently selected conversation
//   - onSelect: callback fired on click -> lifts selection up to MessagesPage
// =============================================================================

const styles = {
  card: (isActive) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px 16px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#f6d9dc' : 'transparent',
    borderBottom: '1px solid #f0e4e5',
    transition: 'background-color 0.15s ease',
  }),
  avatar: {
    flexShrink: 0,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#8c2432',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 700,
  },
  contentCol: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#333',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  timestamp: {
    fontSize: '11px',
    color: '#9a9a9a',
    flexShrink: 0,
    marginLeft: '8px',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2px',
  },
  snippet: {
    fontSize: '12.5px',
    color: '#888',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
  },
  unreadBadge: {
    flexShrink: 0,
    minWidth: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#c0392b',
    color: '#fff',
    fontSize: '10px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
  },
};

function ChatThreadCard({ thread, isActive, onSelect }) {
  return (
    // key={thread.id} should be set by the parent .map() call in ChatSidebar
    <div style={styles.card(isActive)} onClick={() => onSelect(thread)}>
      {/* Avatar badge - TODO: replace initials with real avatar image if USER table gets one */}
      <div style={styles.avatar}>{thread.initials}</div>

      <div style={styles.contentCol}>
        <div style={styles.topRow}>
          <span style={styles.name}>{thread.name}</span>
          <span style={styles.timestamp}>{thread.timestamp}</span>
        </div>
        <div style={styles.bottomRow}>
          <span style={styles.snippet}>{thread.lastMessage}</span>
          {/* Conditional unread counter badge */}
          {thread.unreadCount > 0 && (
            <span style={styles.unreadBadge}>{thread.unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatThreadCard;