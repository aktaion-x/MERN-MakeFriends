import { useContext } from "react";
import { NewUsersContext } from "../../contexts/NewUsersContext";

const useNewUsersContext = () => {
  const context = useContext(NewUsersContext);
  if (!context) {
    throw Error('useNewUsersContext must be used inside an NewUsersContextProvider');
  }
  return context;
};

export default useNewUsersContext;