import { useState } from "react";
import useAuthContext from './ContextsHooks/useAuthContext';

const useFriends = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();
  const getFriends = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/api/v1/explore/friends', {
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
  const removeFriends = async (user_id) => {
    setError(null);
    setIsPending(true);
    try {

      const res = await fetch(`http://127.0.0.1:5000/api/v1/friendship/remove/${user_id}`, {
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
  return { error, isPending, getFriends, removeFriends };
};

export default useFriends;