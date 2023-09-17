import { createContext, useReducer } from "react";

export const AllChatsContext = createContext();

export const allChatsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL_CHATS':
      return { allChats: action.payload };
    case 'ADD_ALL_CHAT':
      return { allChats: [...state.allChats, action.payload] };
    case 'REMOVE_ALL_CHAT':
      return { allChats: state.allChats.filter((chat) => !chat._id !== action.payload) };
    case 'CHAT_SEEN':
      const allChats = state.allChats.map(chat => {
        if (chat._id === action.payload) {
          chat.waitToBeSeen = null;
        }
        return chat;
      });
      return { allChats };
    default:
      return state;
  }
};

export const AllChatsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(allChatsReducer, {
    allChats: null
  });

  return (
    <AllChatsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AllChatsContext.Provider>
  );
};
