// css
import './Signup.css';
// libraries
import { useState } from 'react';
// hooks
import useSignup from '../../hooks/useSignup.js';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, error, isPending } = useSignup();
  const handleThumbnail = (e) => {
    setThumbnail(null);
    const file = e.target.files[0];
    if (!file) {
      setThumbnailError('Please select a file');
      return;
    }
    if (!file.type.includes('image')) {
      setThumbnailError('Selected file must be an image');
      return;
    }
    if (file.size > 1000000) {
      setThumbnailError('Image file size must be less than 1MB');
      return;
    }
    setThumbnailError(null);
    setThumbnail(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, username, name, password, rePassword, thumbnail);
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        {error && <div className="error">{error}</div>}

        <label>
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
        </label>
        <label>
          <span>Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
          />
          <small>Username must be at least 3 chatacter.</small>
        </label>
        <label>
          <span>Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required type="text" />
        </label>
        <label>
          <span>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
          <small>
            Password must be at least 8 characters and contain one lowercase letter, one number, and
            one symbol.
          </small>
        </label>
        <label>
          <span>Repeat Password</span>
          <input
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
            type="password"
          />
        </label>
        <label>
          <span>Profile Image</span>
          <input onChange={handleThumbnail} accept="image/*" required type="file" />
          <small>Maximum image size is 1MB.</small>
          {thumbnailError && <span className="error">{thumbnailError}</span>}
        </label>
        {isPending && (
          <button className="btn" disabled>
            Signup...
          </button>
        )}
        {!isPending && <button className="btn">Signup</button>}
      </form>
    </div>
  );
};

export default Signup;
