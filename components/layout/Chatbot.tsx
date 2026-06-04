export default function Chatbot() {
  return (
    <>
      <button className="chatbot-btn" aria-label="Open chat assistant">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <aside className="chat-panel" aria-label="Chat with Nova">
        <header className="chat-head">
          <div className="ai-avatar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
          </div>
          <div>
            <h4>Nova · AI Assistant</h4>
            <div className="ai-sub"><span className="live"></span> Online · typically replies instantly</div>
          </div>
          <button className="chat-close" aria-label="Close chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></svg>
          </button>
        </header>
        <div className="chat-body"></div>
        <form className="chat-input-row">
          <input type="text" placeholder="Ask anything…" aria-label="Type a message" />
          <button className="chat-send" type="submit" aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </aside>
    </>
  );
}
