import { createContext, useReducer } from "react";

export const FriendsContext = createContext();

export const friendsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FRIENDS':
      return { friends: action.payload };
    case 'ADD_FRIEND':
      return { friends: [...state.friends, action.payload] };
    case 'REMOVE_FRIEND':
      return { friends: state.friends.filter((friend) => friend._id !== action.payload) };
    default:
      return state;
  }
};

export const FriendsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(friendsReducer, {
    friends: null
  });

  return (
    <FriendsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FriendsContext.Provider>
  );
};
