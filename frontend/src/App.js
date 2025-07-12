import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

const BOT_AVATAR = 'https://ui-avatars.com/api/?name=Bot&background=282c34&color=fff';
const USER_AVATAR = 'https://ui-avatars.com/api/?name=You&background=61dafb&color=282c34';

function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('dark_mode') === 'true';
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('dark_mode', darkMode);
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const res = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        {
          sender: 'bot',
          text: data.response || data.error || 'No response',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: 'bot',
          text: 'Error connecting to backend.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
    setIsTyping(false);
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem('chat_history');
  };

  return (
    <div className={`chat-app${darkMode ? ' dark' : ''}`}>  
      <header className="chat-header">
        <span role="img" aria-label="robot">🤖</span> Personal Assistant
        <button className="dark-toggle" onClick={() => setDarkMode(dm => !dm)}>
          {darkMode ? '🌙' : '☀️'}
        </button>
        <button className="clear-btn" onClick={handleClear} title="Clear chat">🗑️</button>
      </header>
      <div className="chat-history">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>  
            <img src={msg.sender === 'user' ? USER_AVATAR : BOT_AVATAR} alt="avatar" className="avatar" />
            <div className="bubble">
              <div className="text">
                {msg.sender === 'bot' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
              <div className="meta">{msg.sender === 'user' ? 'You' : 'Bot'} · {msg.time}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chat-message bot">
            <img src={BOT_AVATAR} alt="avatar" className="avatar" />
            <div className="bubble typing">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input" onSubmit={handleSend} autoComplete="off">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping || !input.trim()}>Send</button>
      </form>
    </div>
  );
}

export default App;
