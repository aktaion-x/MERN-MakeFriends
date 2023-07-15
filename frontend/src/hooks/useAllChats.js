import { useState } from "react";
import useAuthContext from './ContextsHooks/useAuthContext';

const useAllChats = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();
  const getAllChats = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}api/v1/chat/allChats`, {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message);
        setIsPending(false);
        return false;
      }
      setError(null);
      setIsPending(false);
      return json;
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };
  const seenMessage = async (chat_id) => {
    setError(null);
    try {

      const res = await fetch(`${process.env.REACT_APP_BACKEND}api/v1/chat/chatSeen`, {
        method: 'POST',
        body: JSON.stringify({ chatId: chat_id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${user.token}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message);
        return false;
      }
      setError(null);
      return json;
    } catch (error) {
      setError(error.message);
    }
  };
  return { error, isPending, getAllChats, seenMessage };
};

export default useAllChats;