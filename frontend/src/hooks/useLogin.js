import { useState } from "react";
import useAuthContext from "./ContextsHooks/useAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (identifier, password) => {
    setError(null);
    setIsPending(true);
    try {
      if (!identifier || !password) {
        setError('Please fill up all fileds');
        setIsPending(false);
        return false;
      }
      const res = await fetch(`${process.env.REACT_APP_BACKEND}api/v1/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
      });
      console.log(res);
      const json = await res.json();
      if (!res.ok) {
        setError(json.message);
        setIsPending(false);
        return false;
      }
      setError(null);
      setIsPending(false);
      dispatch({ type: 'LOGIN', payload: json });
      return json;
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };
  return { error, isPending, login };
};

export default useLogin;