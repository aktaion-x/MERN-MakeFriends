import { useState } from "react";
import useAuthContext from './ContextsHooks/useAuthContext';

const usePendingRequests = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();
  const postPendingRequest = async (user_id) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}api/v1/friendship/request/${user_id}`, {
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
  const getPendingRequests = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}api/v1/explore/friendshipRequests`, {
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
  const cancelPendingRequest = async (user_id) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}api/v1/friendship/cancelRequest/${user_id}`, {
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
  return { error, isPending, postPendingRequest, getPendingRequests, cancelPendingRequest };
};

export default usePendingRequests;