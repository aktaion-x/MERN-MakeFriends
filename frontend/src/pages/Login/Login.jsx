// css
import './Login.css';
// libraries
import { useState } from 'react';
// hooks
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(identifier, password);
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="error">{error}</div>}
        <label>
          <span>Username or Email</span>
          <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required type="text" />
        </label>
        <label>
          <span>Password</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
        </label>
        {isPending && (
          <button className="btn" disabled>
            Login...
          </button>
        )}
        {!isPending && <button className="btn">Login</button>}
      </form>
    </div>
  );
};

export default Login;
