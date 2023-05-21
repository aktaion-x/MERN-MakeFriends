import { useContext } from "react";
import { PendingRequestsContext } from "../../contexts/PendingRequestsContext";

const usePendingRequestsContext = () => {
  const context = useContext(PendingRequestsContext);
  if (!context) {
    throw Error('usePendingRequestsContext must be used inside an PendingRequestsContextProvider');
  }
  return context;
};

export default usePendingRequestsContext;