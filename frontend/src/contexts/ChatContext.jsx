import { createContext, useReducer } from "react";

export const ChatContext = createContext();

export const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHAT':
      return { chat: action.payload };
    case 'ADD_MESSAGE':
      return { chat: { ...state, messages: [...state.chat.messages, action.payload] } };
    case 'REMOVE_REMOVE':
      return { chat: state.chat.messages.filter((message) => message._id !== action.payload) };
    case 'REMOVE_CHAT':
      return { chat: null };
    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, {
    chat: null
  });

  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
