import React, { useState } from 'react';

// =============================================================================
// MessageInput.jsx
// Bottom rounded pill input for composing a new message + send button.
//
// Props:
//   - onSend(messageText): callback fired when the user submits a message.
//     TODO (Backend): parent (ChatWindow) should call
//       POST /api/messages
//       Body: { senderId: currentUserId, receiverId: activeContact.id, messageContent: messageText }
//     then optimistically append the new message (or refetch the thread).
// =============================================================================

const styles = {
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
    <div style={styles.wrapper}>
      <div style={styles.pill}>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        {/* Send button -> TODO: wire onClick to POST /api/messages */}
        <button
          type="button"
          style={styles.sendButton}
          onClick={handleSend}
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default MessageInput;