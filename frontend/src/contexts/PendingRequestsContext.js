import { createContext, useReducer } from "react";

export const PendingRequestsContext = createContext();

export const pendingRequestsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PENDING_REQUESTS':
      return { pendingRequests: action.payload };
    case 'ADD_PENDING_REQUEST':
      return { pendingRequests: [...state.pendingRequests, action.payload] };
    case 'REMOVE_PENDING_REQUEST':
      return { pendingRequests: state.pendingRequests.filter((user) => user._id !== action.payload) };
    default:
      return state;
  }
};

export const PendingRequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pendingRequestsReducer, {
    pendingRequests: null
  });

  return (
    <PendingRequestsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PendingRequestsContext.Provider>
  );
};
