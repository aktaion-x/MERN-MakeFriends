import { useState } from "react";
import useAuthContext from './ContextsHooks/useAuthContext';

const useFriendRequests = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();
  const getFriendRequests = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}api/v1/explore/friendshipAccepts`, {
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
  const confirmFriendRequests = async (user_id) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}api/v1/friendship/accept/${user_id}`, {
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
  const cancelFriendRequests = async (user_id) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}api/v1/friendship/cancel/${user_id}`, {
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

  return { error, isPending, getFriendRequests, confirmFriendRequests, cancelFriendRequests };
};

export default useFriendRequests;