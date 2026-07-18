import React, { useState } from 'react';
import ChatThreadCard from './ChatThreadCard';

// =============================================================================
// ChatSideBar.jsx
// Left-hand panel: search box + scrollable list of ChatThreadCard rows.
//
// Props:
//   - selectedThreadId: id of the currently active thread (for highlighting)
//   - onSelectThread: callback -> lifts the selected thread up to MessagesPage
//
// TODO (Backend / Spring Boot integration):
//   - Replace MOCK_THREADS below with data fetched from
//     GET /api/messages/threads?userId={currentUserId}
//   - Each thread should be derived by grouping MESSAGE rows by the
//     "other participant" (SenderID/ReceiverID relative to the logged-in user),
//     joined against the USER table for Name/Avatar, and sorted by latest
//     DateSent.
//   - Wire the search input's onChange to filter threads client-side, or debounce
//     and hit GET /api/messages/threads/search?query=... server-side.
//   - Add loading / empty / error states around the .map() below:
//       loading  -> show skeleton rows while the fetch is in flight
//       empty    -> show "No conversations yet" placeholder
//       error    -> show "Couldn't load messages, please try again" + retry button
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

const styles = {
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

function ChatSideBar({ selectedThreadId, onSelectThread }) {
  // TODO: lift searchTerm up or connect to a debounced API search call
  const [searchTerm, setSearchTerm] = useState('');

  // TEMP client-side filter of mock data; replace with server-side search
  // once GET /api/messages/threads/search is available.
  const filteredThreads = MOCK_THREADS.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.sidebar}>
      {/* ================= SEARCH ================= */}
      <div style={styles.searchWrapper}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon} role="img" aria-label="search">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* ================= THREAD LIST ================= */}
      <div style={styles.threadList}>
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

export default ChatSideBar;