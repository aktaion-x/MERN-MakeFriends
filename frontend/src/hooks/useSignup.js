import { useState } from "react";
import useAuthContext from "./ContextsHooks/useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (email, username, name, password, rePassword, image) => {
    setError(null);
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('username', username);
      formData.append('name', name);
      formData.append('password', password);
      formData.append('rePassword', rePassword);
      formData.append('image', image);
      const res = await fetch('http://127.0.0.1:5000/api/v1/user/signup', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message);
        setIsPending(false);
        return;
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
  return { error, isPending, signup };
};

export default useSignup;