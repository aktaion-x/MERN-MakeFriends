import { useContext } from "react";
import { FriendRequestsContext } from "../../contexts/FriendRequestsContext";

const useFriendRequestsContext = () => {
  const context = useContext(FriendRequestsContext);
  if (!context) {
    throw Error('useFriendRequestsContext must be used inside an FriendRequestsContextProvider');
  }
  return context;
};

export default useFriendRequestsContext;