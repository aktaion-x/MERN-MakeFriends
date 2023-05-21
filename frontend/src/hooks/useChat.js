import { useState } from "react";
import useAuthContext from './ContextsHooks/useAuthContext';

const useChat = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();
  const getChat = async (chat_id) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/v1/chat/getChat/${chat_id}`, {
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
  const sendMessage = async (reciverId, message) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/v1/chat/sendMessage/`, {
        method: 'POST',
        body: JSON.stringify({ reciverId, message }),
        headers: {
          'Content-Type': 'application/json',
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
  const removeMessage = async (user_id) => {
    setError(null);
    setIsPending(true);
    try {

      const res = await fetch(`http://127.0.0.1:5000/api/v1/chat/deleteMessage/`, {
        method: 'POST',
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

  return { error, isPending, getChat, sendMessage, removeMessage };
};

export default useChat;