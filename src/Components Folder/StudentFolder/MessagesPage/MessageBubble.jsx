import React from 'react';

// =============================================================================
// MessageBubble.jsx
// Renders a single message bubble - either a "received" (gray, left-aligned)
// or "sent" (maroon, right-aligned) bubble depending on the message's sender.
//
// Props:
//   - message: {
//       messageId       -> MESSAGE.MessageID (PK) - use as the .map() key upstream
//       senderId        -> MESSAGE.SenderID (FK)
//       receiverId      -> MESSAGE.ReceiverID (FK)
//       messageContent  -> MESSAGE.MessageContent
//       dateSent        -> MESSAGE.DateSent (format to a display-friendly time string)
//     }
//   - isSentByCurrentUser: boolean - true when senderId === currentUserId,
//     determines bubble side/color. TODO: compute this in ChatWindow by comparing
//     message.senderId to the logged-in user's id from auth context.
// =============================================================================

const styles = {
  row: (isSent) => ({
    display: 'flex',
    justifyContent: isSent ? 'flex-end' : 'flex-start',
    marginBottom: '18px',
  }),
  bubble: (isSent) => ({
    maxWidth: '60%',
    padding: '12px 16px',
    borderRadius: '14px',
    backgroundColor: isSent ? '#7a2733' : '#e9e9e9',
    color: isSent ? '#fff' : '#333',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  }),
  content: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.4,
  },
  time: (isSent) => ({
    marginTop: '6px',
    fontSize: '11px',
    fontWeight: 600,
    color: isSent ? 'rgba(255,255,255,0.75)' : '#999',
  }),
};

function MessageBubble({ message, isSentByCurrentUser }) {
  return (
    <div style={styles.row(isSentByCurrentUser)}>
      <div style={styles.bubble(isSentByCurrentUser)}>
        {/* MESSAGE.MessageContent */}
        <p style={styles.content}>{message.messageContent}</p>
        {/* Formatted MESSAGE.DateSent */}
        <div style={styles.time(isSentByCurrentUser)}>{message.displayTime}</div>
      </div>
    </div>
  );
}

export default MessageBubble;