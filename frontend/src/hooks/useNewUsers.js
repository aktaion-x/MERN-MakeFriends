import { useState } from "react";
import useAuthContext from './ContextsHooks/useAuthContext';

const useNewUsers = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();
  const getNewUsers = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND}api/v1/explore/allUsers`, {
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
  return { error, isPending, getNewUsers };
};

export default useNewUsers;