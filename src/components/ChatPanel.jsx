import React, { useState } from 'react';
import './ChatPanel.css';

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'assistant', text: '👋 Hi! I can help with coding questions. Type your question below.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    // Placeholder: simulate assistant reply
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'assistant', text: `You asked: "${userMsg.text}". (This is a placeholder reply.)` }]);
      setLoading(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-panel">
      <div className="chat-panel-header">
        <strong>ChatGPT Assistant</strong>
        <div>
          <button className="chat-close" onClick={onClose}>✖</button>
        </div>
      </div>

      <div className="chat-panel-body">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.from === 'assistant' ? 'assistant' : 'user'}`}>
            {m.text}
          </div>
        ))}

        {loading && <div className="chat-msg assistant">Typing…</div>}
      </div>

      <div className="chat-panel-footer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask a coding question..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPanel;
