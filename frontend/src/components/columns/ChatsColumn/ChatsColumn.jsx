// css
import '../columns.css';
// libraries
import { useEffect } from 'react';
// hooks
import useChat from '../../../hooks/useChat';
import useAllChats from '../../../hooks/useAllChats';
// useContexts
import useAuthContext from '../../../hooks/ContextsHooks/useAuthContext';
import useChatContext from '../../../hooks/ContextsHooks/useChatContext';
import useAllChatsContext from '../../../hooks/ContextsHooks/useAllChatsContext';
// components
import ChatBox from '../../boxes/ChatBox/ChatBox';

const ChatsColumn = () => {
  const { getAllChats, seenMessage, isPending, error } = useAllChats();
  const { dispatch: dispatchAllChats, allChats } = useAllChatsContext();
  const { dispatch: dispatchChat, chat: contextChat } = useChatContext();
  const { getChat } = useChat();
  const { user } = useAuthContext();
  useEffect(() => {
    const get = async () => {
      const result = await getAllChats();
      if (result) {
        dispatchAllChats({ type: 'SET_ALL_CHATS', payload: result.data });
      }
    };
    get();
  }, []);
  const handleClick = async (e, chat) => {
    const result = await getChat(chat._id);
    if (result.success) {
      seenMessage(chat._id);
      const chatBoxes = document.querySelectorAll('.chat-box');
      if (document.querySelector('.chat-box.active') !== e.target.closest('li').querySelector('.chat-box') && document.querySelector('.chat-box.active')) {
        chatBoxes.forEach((box) => box.classList.remove('active'));
        setTimeout(() => {
          dispatchChat({ type: 'SET_CHAT', payload: result.data });
          dispatchAllChats({ type: 'CHAT_SEEN', payload: chat._id });
          const chatBox = e.target.closest('li').querySelector('.chat-box');
          chatBox.classList.toggle('active');
        }, 300);
      } else {
        dispatchChat({ type: 'SET_CHAT', payload: result.data });
        dispatchAllChats({ type: 'CHAT_SEEN', payload: chat._id });
        const chatBox = e.target.closest('li').querySelector('.chat-box');
        chatBox.classList.toggle('active');
      }
    }
  };
  return (
    <div className="column chats-column">
      <h2>Chats</h2>
      {isPending && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {allChats && allChats.length === 0 && <div>No Chats yet</div>}
      {allChats && allChats.length !== 0 && (
        <ul>
          {allChats.map((chat) => (
            <li key={chat._id}>
              <div className="user">
                <div className="user-holder">
                  <div className="img">
                    <img src={chat.users[0]._id === user.user._id ? chat.users[1].userImage.url : chat.users[0].userImage.url} alt="" />
                  </div>
                  <div className="user-info">
                    <h4>{chat.users[0]._id === user.user._id ? chat.users[1].name : chat.users[0].name}</h4>
                    <span className="username">{chat.users[0]._id === user.user._id ? chat.users[1].username : chat.users[0].username}</span>
                  </div>
                </div>
                <div className="btns">
                  <span onClick={(e) => handleClick(e, chat)} className={chat.waitToBeSeen === user.user._id ? 'material-symbols-outlined mail active' : 'material-symbols-outlined mail'}>
                    mail
                  </span>
                  <span className="material-symbols-outlined" style={{ color: 'red' }}>
                    delete
                  </span>
                </div>
              </div>
              <ChatBox user={user} chat={contextChat} />
            </li>
          ))}
        </ul>
      )}
      {/* <ul>
        <li>
          <div className="user">
            <div className="user-holder">
              <div className="img">
                <img src="https://res.cloudinary.com/dgtzhvtwv/image/upload/v1683548705/users/karake1/eqpifk6u3vf8oskmzfez.jpg" alt="" />
              </div>
              <div className="user-info">
                <h4>Milad Ahmad</h4>
                <span className="username">milad123</span>
                <span className="join-at">Joined May 2023</span>
              </div>
            </div>
            <div className="btns">
              <span className="material-symbols-outlined mail active">mail</span>
              <span className="material-symbols-outlined" style={{ color: 'red' }}>
                delete
              </span>
            </div>
          </div>
        </li>
      </ul> */}
    </div>
  );
};

export default ChatsColumn;
