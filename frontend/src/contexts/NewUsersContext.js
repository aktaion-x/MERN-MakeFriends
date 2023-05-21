import { createContext, useReducer } from "react";

export const NewUsersContext = createContext();

export const newUsersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEW_USERS':
      return { newUsers: action.payload };
    case 'ADD_NEW_USER':
      return { newUsers: [...state.newUsers, action.payload] };
    case 'REMOVE_NEW_USER':
      return { newUsers: state.newUsers.filter((newUser) => newUser._id !== action.payload) };
    default:
      return state;
  }
};

export const NewUsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newUsersReducer, {
    newUsers: null
  });

  return (
    <NewUsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NewUsersContext.Provider>
  );
};
