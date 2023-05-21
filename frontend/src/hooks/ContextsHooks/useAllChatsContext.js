import { useContext } from "react";
import { AllChatsContext } from "../../contexts/AllChatsContext";

const useAllChatsContext = () => {
  const context = useContext(AllChatsContext);
  if (!context) {
    throw Error('useAllChatsContext must be used inside an AllChatsContextProvider');
  }
  return context;
};

export default useAllChatsContext;