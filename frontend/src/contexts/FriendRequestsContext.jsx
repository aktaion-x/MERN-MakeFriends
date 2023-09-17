import { createContext, useReducer } from "react";

export const FriendRequestsContext = createContext();

export const friendRequestsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FRIEND_REQUESTS':
      return { friendRequests: action.payload };
    case 'ADD_FRIEND_REQUEST':
      return { friendRequests: [...state.friendRequests, action.payload] };
    case 'REMOVE_FRIEND_REQUEST':
      return { friendRequests: state.friendRequests.filter((friend) => friend._id !== action.payload) };
    default:
      return state;
  }
};

export const FriendRequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(friendRequestsReducer, {
    friendRequests: null
  });

  return (
    <FriendRequestsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FriendRequestsContext.Provider>
  );
};
