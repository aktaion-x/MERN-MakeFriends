import useAuthContext from "./ContextsHooks/useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  return { logout };
};

export default useLogout;