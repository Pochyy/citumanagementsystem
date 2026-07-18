import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

// =============================================================================
// ChatWindow.jsx
// Right-hand pane: active chat header, scrollable message list, and the
// message input mounted at the bottom.
//
// Props:
//   - activeContact: { id, name, initials } - the currently selected thread's
//     contact, lifted from ChatSidebar/ChatThreadCard via MessagesPage.
//   - currentUserId: id of the logged-in user (from auth context), used to
//     determine which side each MessageBubble renders on.
//
// TODO (Backend / Spring Boot integration):
//   - On activeContact change, fetch:
//       GET /api/messages/thread/{currentUserId}/{activeContact.id}
//     -> returns MESSAGE rows where
//        (SenderID = currentUserId AND ReceiverID = activeContact.id)
//        OR (SenderID = activeContact.id AND ReceiverID = currentUserId)
//        ordered by DateSent ASC.
//   - Replace MOCK_MESSAGES below with the fetched result.
//   - Add loading / empty / error states around the message list:
//       loading -> skeleton bubbles / spinner
//       empty   -> "No messages yet - say hi!" placeholder
//       error   -> "Couldn't load this conversation" + retry button
//   - handleSendMessage should POST to /api/messages (see MessageInput.jsx)
//     and then append the returned MESSAGE row (with real MessageID/DateSent)
//     to local state, or refetch the thread.
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

const styles = {
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

  // TODO: replace with real POST /api/messages call (see MessageInput.jsx docstring)
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
      <div style={styles.window}>
        <div style={styles.emptyState}>Select a conversation to start messaging.</div>
      </div>
    );
  }

  return (
    <div style={styles.window}>
      {/* ================= ACTIVE CHAT HEADER ================= */}
      <div style={styles.header}>
        <div style={styles.avatar}>{activeContact.initials}</div>
        <div style={styles.headerName}>{activeContact.name}</div>
      </div>

      {/* ================= MESSAGE LIST (scrollable) ================= */}
      <div style={styles.messageList}>
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

export default ChatWindow;