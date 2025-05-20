import React, { useState } from 'react';
import UserInfo from './UserInfo';
import './Chat.css';

const Chat = () => {
  const [activeContact, setActiveContact] = useState('Friend 1');
  const [messages, setMessages] = useState({
    "Friend 1": [
      { text: "Hello! How are you?", type: "received", timestamp: "10:00 AM" },
      { text: "I'm good, thanks! You?", type: "sent", timestamp: "10:01 AM" }
    ],
    "Friend 2": [],
    "Friend 3": []
  });
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      text: messageInput,
      type: 'sent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), newMessage]
    }));

    setMessageInput('');
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <UserInfo username="Username" />
        
        <input 
          type="text" 
          className="user-search" 
          placeholder="Search users..." 
          autoComplete="off" 
        />

        <div className="contacts">
          {Object.keys(messages).map(contact => (
            <div
              key={contact}
              className={`contact-item ${activeContact === contact ? 'active' : ''}`}
              onClick={() => setActiveContact(contact)}
            >
              {contact}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-panel">
        <div className="chat-header">{activeContact}</div>
        <div className="messages">
          {messages[activeContact]?.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.text}
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          ))}
        </div>
        <form className="input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 