import { useContext } from "react";
import { FriendsContext } from "../../contexts/FriendsContext";

const useFriendsContext = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw Error('useFriendsContext must be used inside an FriendsContextProvider');
  }
  return context;
};

export default useFriendsContext;