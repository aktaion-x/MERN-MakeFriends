// css
import './ChatBox.css';
// libraries
import { useEffect, useRef, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// hooks
import useChat from '../../../hooks/useChat';
// useContexts
import useChatContext from '../../../hooks/ContextsHooks/useChatContext';

const ChatBox = ({ user }) => {
  const messagesRef = useRef(null);
  const [message, setMessage] = useState('');
  const { dispatch, chat } = useChatContext();
  const { sendMessage } = useChat();
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chat]);
  const handleSendClick = async (e) => {
    e.preventDefault();
    const reciverId = chat.users[0] === user.user._id ? chat.users[1] : chat.users[0];
    const result = await sendMessage(reciverId, message);
    if (result.success) {
      dispatch({ type: 'SET_CHAT', payload: result.data });
      setMessage('');
    }
  };
  return (
    <div className="chat-box">
      <div className="box">
        {chat && (
          <>
            <div className="messages" ref={messagesRef}>
              <span className="chat-created-at">{new Date(chat.createdAt).toUTCString().split('GMT')[0]}</span>
              {chat.messages.map((message, i) => (
                <div key={message._id} className={message.sender === user.user._id ? 'sender message-holder' : 'reciver message-holder'}>
                  <span className="message">{message.message}</span>
                  <small className="time">{chat.messages[i + 1] && formatDistanceToNow(new Date(chat.messages[i + 1].timestamp)) === formatDistanceToNow(new Date(message.timestamp)) ? '' : formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</small>
                </div>
              ))}
            </div>
            <form className="send-message">
              <input placeholder="Start a new message" value={message} onChange={(e) => setMessage(e.target.value)} required type="text" />
              <button onClick={handleSendClick} className="material-symbols-outlined">
                send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
